localStorage.removeItem('selectedWorker');

function selectWorker(content, index) {
    var workers = JSON.parse(localStorage.getItem('workers')) || [];
    var selectedWorker = workers[index];
    var divs = document.querySelectorAll('.profile .worker');

    // Verifica se a imagem já está selecionada
    if (content.parentElement.classList.contains("selected")) {
        content.parentElement.classList.remove("selected");
        localStorage.removeItem('selectedWorker');
        return;
    }

    // Remove a classe "selected" de todos os divs
    divs.forEach(function(div) {
        div.classList.remove("selected");
    });

    // Adiciona o trabalhador selecionado no localStorage
    localStorage.setItem('selectedWorker', JSON.stringify(selectedWorker));
    // Adiciona a classe "selected" ao elemento pai da imagem clicada
    content.parentElement.classList.add("selected");
    console.log(selectedWorker);
}

function backToServicesList() {
    window.location.href = "service-list.html";
}
function goToAvailableTimes() {
    var selectedWorker = JSON.parse(localStorage.getItem('selectedWorker'));
    
    if (!selectedWorker) {
        alert('Por favor, selecione um profissional antes de avançar.');
        return;
    }

    window.location.href = "available-times.html";
}

const url = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

fetch('http://127.0.0.1:5000/workers')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Armazena os dados no localStorage
        localStorage.setItem('workers', JSON.stringify(data));
        // Atualiza o conteúdo do container com os dados dos workers
        const container = document.getElementById('container-workers');
        container.innerHTML = data.map((worker, index) => `
            <div class="worker">
                <img id="image-profile" src="${url}" alt="${worker.name}" class="image" onclick="selectWorker(this, ${index})">
                <span class="worker-name">${worker.name}</span>
            </div>
        `).join('');
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
