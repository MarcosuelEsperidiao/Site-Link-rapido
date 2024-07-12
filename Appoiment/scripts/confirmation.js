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
                // Reserva bem-sucedida, redirecionar para a próxima página
               alert('Reserva bem-sucedida');
            } else {
                // Reserva falhou, tratar o erro conforme necessário
                throw new Error('Reserva falhou');
            }
        })
        .catch(error => {
            // Tratar o erro de reserva
            console.error('Erro ao confirmar reserva:', error);
        });
}