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
   // document.getElementById('nextBtn').disabled = true;
}

// Função para avançar ou voltar entre os passos
function nextPrev(n) {
    let x = document.getElementsByClassName("step");
    // Valida o formulário antes de avançar para o próximo passo
    if (n === 1 && !validateForm()) {
        return false;
    }
    // Etapa de Registro
    if (currentTab === 3) {
        validateCustomerData();
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