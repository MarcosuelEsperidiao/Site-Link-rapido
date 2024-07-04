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
    // Cria um objeto Date a partir da string do input
    const data = new Date(input.value + "T00:00:00");
    // Cria um objeto Date para hoje e zera as horas
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    // Obtem o dia da semana da data (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
    const diaSemana = data.getDay();

    // Obtém o elemento da mensagem de erro
    const mensagemErro = document.getElementById('error-message');

    // Verifica se a data do input é menor que a data atual ou se é um domingo
    if (data < hoje || diaSemana === 0) {
        input.value = "";
        mensagemErro.style.display = 'block';
    } else {
        mensagemErro.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Certifique-se de que o evento DOMContentLoaded está sendo usado para garantir que o DOM esteja pronto antes do script ser executado
});

function loadAvailableHours(input) {
    const dateInput = document.getElementById('idate');
    const workerId = 1; // Substitua pelo ID real do trabalhador

    if (dateInput) {
        console.log(input);
        console.log(dateInput.value);
        console.log('Requesting available times...');
        requestAvailableHours(dateInput.value, workerId); // Chame a função correta aqui
    } else {
        console.error('Elemento de input de data não encontrado.');
    }
}

function requestAvailableHours(selectedDate, workerId) {
    fetch(`http://127.0.0.1:5000/available-hours?date=${selectedDate}&worker_id=${workerId}`)
        .then(response => response.json())
        .then(data => {
            // Manipule os dados da resposta e atualize o DOM
            const horariosDisponiveis = document.getElementById('horarios-disponiveis');
            if (data.available_hours && data.available_hours.length > 0) {
                horariosDisponiveis.innerHTML = data.available_hours.map(hour => `
                    <div class="available-hour" onclick="selectHour(this)">
                        ${hour}
                    </div>
                `).join('');
            } else {
                horariosDisponiveis.innerHTML = '<p>Nenhum horário disponível para esta data.</p>';
            }
        })
        .catch(error => {
            // Manipule qualquer erro
            console.error(error);
        });
}

function selectHour(element) {
    // Remova a classe 'selected' de qualquer outro horário selecionado
    const previouslySelected = document.querySelector('.available-hour.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }

    // Adicione a classe 'selected' ao horário clicado
    element.classList.add('selected');
}
