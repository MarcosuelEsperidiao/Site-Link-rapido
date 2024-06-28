function selectImage(imagem) {
    var divs = document.querySelectorAll('.profile .worker');

    // Verifica se a imagem já está selecionada
    if (imagem.parentElement.classList.contains("selected")) {
        imagem.parentElement.classList.remove("selected");
        return;
    }

    divs.forEach(function(div) {
        div.classList.remove("selected");
    });

    imagem.parentElement.classList.add("selected");
}

function sendInformation() {
    // Obtém o profissional selecionado
    var selectedProfessional = document.querySelector('.profile .worker.selected img');
    var name = selectedProfessional ? selectedProfessional.alt : '';

    let availableTimes = [];
    switch (name) {
        case 'Marcos':
            availableTimes = ["09:00", "10:00", "11:00", "12:00"];
            break;
        case 'Victor':
            availableTimes = ["10:00", "11:00", "12:00"];
            break;
        case 'Samy':
            availableTimes = ["11:00", "12:00", "13:00"];
            break;
        case 'Luiz':
            availableTimes = ["12:00", "13:00", "14:00"];
            break;
        default:
            availableTimes = [];
    }
    

    console.log(name);
    console.log(availableTimes);

    // Armazena o profissional selecionado e os horários disponíveis no localStorage
    localStorage.setItem('selected-worker', name);
    localStorage.setItem('availableTimes', JSON.stringify(availableTimes));
}
const url = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

fetch('http://127.0.0.1:5000/workers')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
        const container = document.getElementById('container-workers');
        container.innerHTML = data.map(worker => `
            <div class="worker">
                <img id="image-profile" src="${url}" alt="${worker.name}" class="image" onclick="selectImage(this)">
                <span class="worker-name">${worker.name}</span>
            </div>
        `).join('');
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
