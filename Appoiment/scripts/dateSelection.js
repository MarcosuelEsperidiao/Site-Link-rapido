document.addEventListener('DOMContentLoaded', function() {
    // Configuração do Pikaday com Moment.js e localização para português
    var datepicker = new Pikaday({
        field: document.getElementById('datepicker'),
        format: 'DD/MM/YYYY',
        showTime: false,
        use24hour: true,
        minDate: new Date(), // Define a data mínima como a data atual
        i18n: {
            previousMonth: 'Mês Anterior',
            nextMonth: 'Próximo Mês',
            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            weekdays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira','Quinta-feira', 'Sexta-feira', 'Sábado'],
            weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
        },
        toString(date) {
            return `${this.i18n.weekdays[date.getDay()]} - ${date.getDate()} ${this.i18n.months[date.getMonth()]} ${date.getFullYear()}`;
        },
        onSelect: function(selectedDate) {
            var selectedWorker = JSON.parse(localStorage.getItem('selectedWorker'));
            var formattedDate = moment(selectedDate).locale('pt-br').format('YYYY-MM-DD');
            localStorage.setItem('selectedDate', formattedDate);
            console.log(formattedDate);
            requestAvailableHours(formattedDate, selectedWorker.id);
        }
    });
});

function selectHour(element, index) {
    // Remove a classe 'selected' do horário anteriormente selecionado
    const previouslySelected = document.querySelector('.list-group-item.active');
    if (previouslySelected) {
        previouslySelected.classList.remove('active');
    }
    var availableTimes = JSON.parse(localStorage.getItem('availableTimes'));
    var selectedDate = localStorage.getItem('selectedDate');
    var selectedTime = availableTimes[index];
    var formattedDate = selectedDate + " " + selectedTime + ":00";
    console.log(formattedDate);
    localStorage.setItem('selectedDateTime', formattedDate);
    // Adicione a classe 'selected' ao horário clicado
    element.classList.add('active');
}

function requestAvailableHours(selectedDate, workerId) {
    fetch(`http://127.0.0.1:5000/available-hours?date=${selectedDate}&worker_id=${workerId}`)
        .then(response => response.json())
        .then(data => {
            // Manipule os dados da resposta e atualize o DOM
            const availableTimes = document.getElementById('available-times');
            if (data.available_hours && data.available_hours.length > 0) {
                localStorage.setItem('availableTimes', JSON.stringify(data.available_hours));
                availableTimes.innerHTML = data.available_hours.map((hour, index) => `
                    <button type="button"
                            id="selectTime"
                            onclick="selectHour(this, ${index})"
                            class="list-group-item list-group-item-action">${hour}
                    </button>
                `).join('');
            } else {
                availableTimes.innerHTML = `
                <p id="description"style="padding-top: 10px">Nenhum horário disponível para esta data.</p>
                <p id="description">Selecione outra data.</p>`;
            }
        })
        .catch(error => {
            // Manipule qualquer erro
            console.error(error);
    });
}