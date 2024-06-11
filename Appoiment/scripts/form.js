const phone = document.getElementById('field-phone');

phone.addEventListener('keypress', (e) => addMaskPhone(e.target.value));
phone.addEventListener('change', (e) => addMaskPhone(e.target.value));

const addMaskPhone = (value) => {
    value = value.replace(/\D/g, "")
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    phone.value = value;
}

function enviarInformacoes() {
    var nome = document.getElementById('field-name').value;
    var email = document.getElementById('field-email').value;
    var telefone = document.getElementById('field-phone').value;
    var date = document.getElementById('idate').value;
    
    var horarioSelecionado = document.querySelector('.horario-selecionado');
    var horario = horarioSelecionado ? horarioSelecionado.textContent : "Você Não Selecionou o Horário";

    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);
    localStorage.setItem('telefone', telefone);
    localStorage.setItem('date', date);
    localStorage.setItem('horario', horario);
}

document.addEventListener('DOMContentLoaded', function() {
    var horariosDisponiveis = JSON.parse(localStorage.getItem('availableTimes'));

    var horariosUl = document.getElementById('horarios-disponiveis');
    horariosUl.innerHTML = "<h2>Horários Disponíveis:</h2>";
    horariosDisponiveis.forEach(function(horario) {
        var novoItem = document.createElement("div");
        novoItem.classList.add("horario-item");
        novoItem.textContent = horario;
        novoItem.addEventListener('click', function() {
            selecionarHorario(novoItem);
        });
        horariosUl.appendChild(novoItem);
    });
});

function selecionarHorario(horarioItem) {
    var horarios = document.querySelectorAll('.horario-item');
    horarios.forEach(function(item) {
        item.classList.remove('horario-selecionado');
    });
    horarioItem.classList.add('horario-selecionado');

    var horarioSelecionadoDiv = document.getElementById('horario-selecionado');
    horarioSelecionadoDiv.textContent = "Horário Selecionado: " + horarioItem.textContent;
}

function validarData(input) {
    const data = new Date(input.value);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const diaSemana = data.getDay();

    const mensagemErro = document.getElementById('error-message');

    if (data < hoje || diaSemana === 0) {
        input.value = "";
        mensagemErro.style.display = 'block';
    } else {
        mensagemErro.style.display = 'none';
    }
    
}