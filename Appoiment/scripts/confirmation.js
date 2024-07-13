    function confirmAppointment() {
        var selectedServices = JSON.parse(localStorage.getItem('selectedServices')) || [];
        var selectedWorker = JSON.parse(localStorage.getItem('selectedWorker'));
        var selectedDate = localStorage.getItem('selectedDate');
        var client = JSON.parse(localStorage.getItem('client'));

        const parameters = {
            service_id: selectedServices[0].id, // Corrigir para um array de IDs de servicos
            client_id: client.id,
            worker_id: selectedWorker.id,
            start_time: selectedDate
        };

        console.log(parameters);
        requestAppointment(parameters);
}

function requestAppointment(parameters) {
    fetch('http://127.0.0.1:5000/appointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameters)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Processar a resposta JSON
        } else if (response.status === 409) {
            throw new Error('Horário indisponível');
        } else if (response.status === 404) {
            throw new Error('Serviço, cliente ou trabalhador não encontrado');
        } else {
            throw new Error('Erro na criação do agendamento');
        }
    })
    .then(data => {
        // Reserva bem-sucedida
        alert('Reserva bem-sucedida');
        console.log('Agendamento criado:', data.appointment); // Detalhes do agendamento
        // Redirecionar ou atualizar a UI conforme necessário
    })
    .catch(error => {
        // Tratar o erro de reserva
        console.error('Erro ao confirmar reserva:', error);
        alert(error.message); // Mostrar mensagem de erro ao usuário
    });
}
