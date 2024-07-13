// Variável global para controlar o índice do passo atual
let currentTab = 0;

// Função para exibir o passo atual
function showTab(n) {
    let x = document.getElementsByClassName("step");
    x[n].style.display = "block";

    // Atualiza a barra de progresso
    let progress = (n / (x.length - 1)) * 100;
    document.querySelector(".progress-bar").style.width = progress + "%";
    document.querySelector(".progress-bar").setAttribute("aria-valuenow", progress);

    // Exibe ou oculta os botões de navegação com base no índice do passo atual
    document.getElementById("prevBtn").style.display = (n === 0) ? "none" : "inline";
    document.getElementById("nextBtn").innerHTML = (n === x.length - 1) ? "Confirmar" : "Próximo";

    // Desabilita o botão "Próximo" ao iniciar cada passo
    document.getElementById('nextBtn').disabled = true;
}

// Função para avançar ou voltar entre os passos
function nextPrev(n) {
    let x = document.getElementsByClassName("step");

    // Valida o formulário antes de avançar para o próximo passo
    if (n === 1 && !validateForm()) {
        return false;
    }

    // Oculta o passo atual
    x[currentTab].style.display = "none";

    // Atualiza o índice do passo atual
    currentTab += n;

    // Exibe o próximo passo
    if (currentTab >= x.length) {
        // Reinicia o formulário após o último passo
        resetForm();
        return false;
    }
    showTab(currentTab);
}

// Função para validar o formulário do passo atual
function validateForm() {
    let valid = true;
    let x = document.getElementsByClassName("step");
    let y = x[currentTab].getElementsByTagName("input");
    for (let i = 0; i < y.length; i++) {
        if (y[i].value === "") {
            y[i].className += " invalid";
            valid = false;
        }
    }
    return valid;
}

// Função para reiniciar o formulário
function resetForm() {
    let x = document.getElementsByClassName("step");
    for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    // Limpa os valores dos inputs e classes de validação
    let inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.value = "";
        input.className = "";
    });

    // Reinicia o índice do passo atual e exibe o primeiro passo
    currentTab = 0;
    showTab(currentTab);

    // Reinicia a barra de progresso
    document.querySelector(".progress-bar").style.width = "0%";
    document.querySelector(".progress-bar").setAttribute("aria-valuenow", 0);

    // Oculta o botão "Voltar" no primeiro passo
    document.getElementById("prevBtn").style.display = "none";

    // Desabilita o botão "Próximo" ao iniciar cada passo
    document.getElementById('nextBtn').disabled = true;
}

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

// Função para selecionar um trabalhador
function selectWorker(event, element, index) {
    event.preventDefault();
    let workers = JSON.parse(localStorage.getItem('workers')) || [];
    let selectedWorker = workers[index];

    // Remove a classe 'selected-worker' de todos os itens
    const items = document.querySelectorAll('.list-group-item');
    items.forEach(item => {
        item.classList.remove('selected-worker');
    });

    // Adiciona a classe 'selected-worker' ao item clicado
    element.classList.add('selected-worker');
    localStorage.setItem('selectedWorker', JSON.stringify(selectedWorker));

    // Habilita o botão "Próximo" após selecionar um trabalhador
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

    // Carrega a lista de trabalhadores ao carregar a página
    fetch('http://127.0.0.1:5000/workers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('workers', JSON.stringify(data));
            const workerListContainer = document.getElementById('workerList');
            workerListContainer.innerHTML = data.map((worker, index) => `
            <a href="#" class="list-group-item list-group-item-action rounded" 
                onclick="selectWorker(event, this, ${index})">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="d-flex align-items-center">
                            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Imagem de perfil de ${worker.name}" class="rounded me-3 border" style="width: 64px; height: 64px; object-fit: cover;">
                            <div>
                                <h5 class="mb-1"> ${worker.name}</h5>
                                <p class="mb-1">Descrição</p>
                            </div>
                        </div>
                        <small class="text-body-secondary">Há 3 dias atrás</small>
                    </div>
                </a>
            `).join('');
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});
