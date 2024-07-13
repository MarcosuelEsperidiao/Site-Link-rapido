let currentTab = 0;
showTab(currentTab);

function showTab(n) {
    let x = document.getElementsByClassName("step");
    x[n].style.display = "block";
    let progress = (n / (x.length - 1)) * 100;
    document.querySelector(".progress-bar").style.width = progress + "%";
    document.querySelector(".progress-bar").setAttribute("aria-valuenow", progress);
    document.getElementById("prevBtn").style.display = n == 0 ? "none" : "inline";
    document.getElementById("nextBtn").innerHTML = n == x.length - 1 ? "Confirmar" : "Próximo";
}

function nextPrev(n) {
    let x = document.getElementsByClassName("step");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab += n;
    if (currentTab >= x.length) {
        resetForm();
        return false;
    }
    showTab(currentTab);
}

function validateForm() {
    let valid = true;
    let x = document.getElementsByClassName("step");
    let y = x[currentTab].getElementsByTagName("input");
    for (var i = 0; i < y.length; i++) {
        if (y[i].value == "") {
            y[i].className += " invalid";
            valid = false;
        }
    }
    return valid;
}

function resetForm() {
    let x = document.getElementsByClassName("step");
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    let inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.value = "";
        input.className = "";
    });
    currentTab = 0;
    showTab(currentTab);
    document.querySelector(".progress-bar").style.width = "0%";
    document.querySelector(".progress-bar").setAttribute("aria-valuenow", 0);
    document.getElementById("prevBtn").style.display = "none";
}

function selectService(event, element, index) {
    event.preventDefault();

    var services = JSON.parse(localStorage.getItem('services')) || [];
    var selectedService = services[index];

    // Remove the 'selected-service' class from all items
    const items = document.querySelectorAll('.list-group-item');
    items.forEach(item => {
        item.classList.remove('selected-service');
    });

    // Add the 'selected-service' class to the clicked item
    element.classList.add('selected-service');
    localStorage.setItem('selectedService', JSON.stringify(selectedService));
    console.log(selectedService);
    // Enable the Next button
    document.getElementById('nextBtn').disabled = false;
}

fetch('http://127.0.0.1:5000/services')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json(); // Converte a resposta para JSON
})
.then(data => {
    localStorage.setItem('services', JSON.stringify(data));

    const serviceListContainer = document.getElementById('serviceList');
    serviceListContainer.innerHTML = data.map((service, index) => `
        <a href="#" class="list-group-item list-group-item-action"
            onclick="selectService(event, this, ${index})">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${service.name}</h5>
                    <small class="text-body-secondary">R$ ${service.value}</small>
                </div>
                <p class="mb-1">${service.description}</p>
                <small class="text-body-secondary">${service.duration} minutos</small>
            </a>
    `).join('');
})
.catch(error => {
    console.error('Fetch error:', error);
});
