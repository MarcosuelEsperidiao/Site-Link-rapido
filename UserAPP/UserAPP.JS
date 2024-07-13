var appointments = [];

// Mantem o painel de agendamentos atualizado
setInterval(function() {
  location.reload();
}, 30 * 60 * 1000);

// Verifica os agendamentos a cada 5 minutos
setInterval(checkCompletedAppointments, 5 * 60 * 1000);

 function checkCompletedAppointments() {
  var now = new Date();
  appointments = appointments.filter(appointment => {
      var endTime = new Date(appointment.end_time);
      return endTime > now; // Mantém apenas os agendamentos não concluídos
  });
  showAppointments();
}

function showAppointments() {
  var container = document.getElementById('container');
  appointments.forEach((appointment, index) => {
      var div = document.createElement('div');
      div.className = 'service';
      div.dataset.index = index;
      div.innerHTML = `
      <div class="item-container">
          <button class="but" type="submit" onclick="deleteAppointment(${index})">EXCLUIR</button>
      </div>
      <li>Serviço: ${appointment.service.name}<br>
          Profissional: ${appointment.worker.name}<br>
          Nome: ${appointment.client.name}<br>
          Email: ${appointment.client.email}<br>
          Telefone: ${appointment.client.phone}<br>
          Data: ${appointment.start_time}<br> 13/07/2024
          Horário: ${appointment.start_time} 09:30
      </li>
      `;
      container.appendChild(div);
  });
};
function deleteAppointment(index) {
  // Remove o agendamento do array
  appointments.splice(index, 1);

  // Atualiza a exibição dos agendamentos
  renderAppointments();
}

function renderAppointments() {
  var container = document.getElementById('container');
  container.innerHTML = ''; // Limpa a lista de agendamentos

    appointments.forEach((appointment, index) => {
        var div = document.createElement('div');
        div.className = 'service';
        div.dataset.index = index;
        div.innerHTML = `
        <div class="item-container">
            <button class="but" type="submit" onclick="deleteAppointment(${index})">EXCLUIR</button>
        </div>
        <li>Serviço: ${appointment.service.name}<br>
            Profissional: ${appointment.worker.name}<br>
            Nome: ${appointment.client.name}<br>
            Email: ${appointment.client.email}<br>
            Telefone: ${appointment.client.phone}<br>
            Data: ${appointment.start_time}<br> 13/07/2024
            Horário: ${appointment.start_time} 09:30
        </li>
        `;
        container.appendChild(div);
    });
}

fetch('http://127.0.0.1:5000/services/today')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        appointments = data;
        checkCompletedAppointments();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });