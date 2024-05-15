const phone = document.getElementById('field-phone') // Seletor do campo de telefone

phone.addEventListener('keypress', (e) => addMaskPhone(e.target.value)) // Dispara quando digitado no campo
phone.addEventListener('change', (e) => addMaskPhone(e.target.value)) // Dispara quando autocompletado o campo

const addMaskPhone = (value) => {
    value = value.replace(/\D/g, "")
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    phone.value = value;
}

function enviarInformacoes() {
    // Obtém os valores dos campos de entrada
    var nome = document.getElementById('iname').value;
    var email = document.getElementById('iemail').value;
    var telefone = document.getElementById('inumero').value;
    var date = document.getElementById('idate').value;
    
    var horarioSelecionado = document.querySelector('.horario-selecionado');
    var horario = horarioSelecionado ? horarioSelecionado.textContent : "Você Não Selecionou o Horário";

    // Armazena os valores no localStorage
    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);
    localStorage.setItem('telefone', telefone);
    localStorage.setItem('date', date);
    localStorage.setItem('horario', horario);
} 

// Recupera os horários disponíveis do localStorage
var horariosDisponiveis = JSON.parse(localStorage.getItem('horarios-disponiveis'));

// Exibe os horários disponíveis na página
var horariosUl = document.getElementById('horarios-disponiveis');
horariosUl.innerHTML = "<h2>Horários Disponíveis:</h2>"; // Limpa qualquer conteúdo anterior
horariosDisponiveis.forEach(function(horario) {
    var novoItem = document.createElement("div");
    novoItem.classList.add("horario-item"); // Adiciona a classe 'horario-item' ao novo item da lista
    novoItem.textContent = horario; // Define o conteúdo do item da lista como o horário
    novoItem.addEventListener('click', function() {
        selecionarHorario(novoItem); // Quando clicado, chama a função para selecionar o horário
    });
    horariosUl.appendChild(novoItem); // Adiciona o novo item da lista à lista de horários
});

// Função para selecionar um horário
function selecionarHorario(horarioItem) {
    var horarios = document.querySelectorAll('.horario-item'); // Seleciona todos os itens de horário
    horarios.forEach(function(item) {
        item.classList.remove('horario-selecionado'); // Remove a classe 'horario-selecionado' de todos os itens
    });
    horarioItem.classList.add('horario-selecionado'); // Adiciona a classe 'horario-selecionado' ao item clicado

    // Mostra o horário selecionado em outra div
    var horarioSelecionadoDiv = document.getElementById('horario-selecionado');
    horarioSelecionadoDiv.textContent = "Horário Selecionado: " + horarioItem.textContent;
}

function validarData(input) {
    var selectedDate = new Date(input.value);
    var today = new Date();
    var errorParagraph = document.getElementById('error-message');

    if (selectedDate < today) {
        errorParagraph.style.display = 'block';
        input.value = '';
    } else {
        errorParagraph.style.display = 'none';
    }
}