// Função para selecionar um serviço
function selectService(event, element, index) {
    event.preventDefault();
    let services = JSON.parse(localStorage.getItem('services')) || [];
    let selectedService = services[index];
    // Remove a classe 'selected-service' de todos os itens
    const items = document.querySelectorAll('.list-group-item');
    items.forEach(item => {
        item.classList.remove('selected-service');
    });
    // Adiciona a classe 'selected-service' ao item clicado
    element.classList.add('selected-service');
    localStorage.setItem('selectedService', JSON.stringify(selectedService));
    document.getElementById('nextBtn').disabled = false;
}

// Carrega a lista de serviços ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:5000/services')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('services', JSON.stringify(data));
            const serviceListContainer = document.getElementById('serviceList');
            serviceListContainer.innerHTML = data.map((service, index) => `
                <a href="#" class="list-group-item list-group-item-action rounded"
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
    }
);