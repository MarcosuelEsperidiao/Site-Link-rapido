localStorage.removeItem('selectedDate');

function selectHour(element, index) {
    // Remove a classe 'selected' do horário anteriormente selecionado
    const previouslySelected = document.querySelector('.available-hour.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
        localStorage.removeItem('selectedDate');
    }

    const dateInput = document.getElementById('idate');
    var availableTimes = JSON.parse(localStorage.getItem('availableTimes'));
    var selectedTime = availableTimes[index];
    var selectedDate = dateInput.value + " " + selectedTime + ":00";
    localStorage.setItem('selectedDate', selectedDate);
    console.log(selectedDate);
    // Adicione a classe 'selected' ao horário clicado
    element.classList.add('selected');
}

function loadAvailableHours(input) {
    const dateInput = document.getElementById('idate');
    var selectedWorker = JSON.parse(localStorage.getItem('selectedWorker'));

    if (dateInput) {
        requestAvailableHours(dateInput.value, selectedWorker.id);
    } else {
        console.error('Elemento de input de data não encontrado.');
    }
}

function backToWorkerList() {
    window.location.href = "list-workers.html";
}

function goToRegistration() {
    if(!localStorage.getItem('selectedDate')) {
        alert('Por favor, selecione um horário antes de avançar.');
        return;
    }

    window.location.href = "register.html";
}


function requestAvailableHours(selectedDate, workerId) {
    fetch(`http://127.0.0.1:5000/available-hours?date=${selectedDate}&worker_id=${workerId}`)
        .then(response => response.json())
        .then(data => {
            // Manipule os dados da resposta e atualize o DOM
            const availableTimes = document.getElementById('horarios-disponiveis');
            if (data.available_hours && data.available_hours.length > 0) {
                localStorage.setItem('availableTimes', JSON.stringify(data.available_hours));
                availableTimes.innerHTML = data.available_hours.map((hour, index) => `
                    <div class="available-hour" onclick="selectHour(this, ${index})">
                        ${hour}
                    </div>
                `).join('');
            } else {
                availableTimes.innerHTML = '<p>Nenhum horário disponível para esta data.</p>';
            }
        })
        .catch(error => {
            // Manipule qualquer erro
            console.error(error);
        });
}