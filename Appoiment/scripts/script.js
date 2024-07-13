localStorage.removeItem('selectedService');

// Seleciona todos os elementos com a classe "icon" (assumindo que há mais de um)
const icons = document.getElementsByClassName("icon");

// Itera sobre todos os elementos selecionados para adicionar o listener de evento
Array.from(icons).forEach(icon => {
    icon.addEventListener("click", function(event) {
        // Verifica se o clique ocorreu diretamente no ícone
        if (event.target.classList.contains("icon")) {
            // Chama a função toggleIcon apenas se o clique foi no ícone
            toggleIcon(event.target);
        }
    });
});

function toggleIcon(icon, index) {
    var services = JSON.parse(localStorage.getItem('services')) || [];
    var selectedService = JSON.parse(localStorage.getItem('selectedService'));
    var selectedService = services[index];

    if (index === -1) {
        console.error('Serviço não encontrado na lista de selecionados.');
        return;
    }

    // Desmarca todos os ícones antes de marcar o novo ícone
    Array.from(icons).forEach(icon => {
        icon.classList.remove("fa-check", "selected");
        icon.classList.add("fa-plus");
    });

    // Limpa a lista de serviços selecionados
    selectedServices = [];

    if (icon.classList.contains("fa-plus")) {
        // Se for o ícone de adição, troca para o ícone de verificação
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-check", "selected");

        // Adiciona o serviço selecionado ao array de serviços selecionados
      //  selectedServices.push(selectedService);
        localStorage.setItem('selectedService', JSON.stringify(selectedService));
    } else {
        // Se for o ícone de verificação, troca para o ícone de adição
        icon.classList.remove("fa-check", "selected");
        icon.classList.add("fa-plus");
        // Remove o serviço selecionado do array de serviços selecionados
    localStorage.removeItem('selectedService');
    }

    // Atualiza a lista de serviços selecionados no localStorage
    //localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    console.log(selectedService);
}

function goToWorkerList() {
    var selectedService = JSON.parse(localStorage.getItem('selectedService'));
    console.log('Serviço selecionado:', selectedService);

    if (selectedService) {
        window.location.href = 'list-workers.html';
    } else {
        alert('Por favor, selecione um serviço antes de avançar.');
    }
}

// script.js

fetch('http://127.0.0.1:5000/services')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
        localStorage.setItem('services', JSON.stringify(data));

        const container = document.getElementById('container-services');
        container.innerHTML = data.map((service, index) => `
            <div class="col-md-4 mb-4">
                <div class="card service">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title">${service.name}</h5>
                            <p class="card-text">
                                <span class="time">${service.duration} minutos</span><br>
                                <span class="value">R$ ${service.value}</span>
                            </p>
                        </div>
                        <i class="fas fa-plus icon" onclick='toggleIcon(this, ${index})'></i>
                    </div>
                </div>
            </div>
        `).join('');
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });


