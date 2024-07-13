document.addEventListener('DOMContentLoaded', function() {
    var agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    var container = document.getElementById('container');

    agendamentos.forEach(function(dados, index) {
      var serviceDiv = document.createElement('div');
      serviceDiv.className = 'service';
      serviceDiv.dataset.index = index; // Identificador único para cada serviço
      serviceDiv.innerHTML = `
        <div class="item-container">
           <button class="but" type="submit" onclick="excluirServico(${index})">EXCLUIR</button>
        </div>
        <li>Serviço: ${dados.servicoSelecionado}<br>
          Profissional: ${dados.imagemSelecionada}<br>
          Nome: ${dados.nome}<br>
          Email: ${dados.email}<br>
          Telefone: ${dados.telefone}<br>
          Data: ${dados.date}<br>
          Horário: ${dados.horario}
        </li>
      `;
      container.appendChild(serviceDiv);
    });
  });

  function excluirServico(index) {
    var agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    agendamentos.splice(index, 1); // Remove o agendamento do array
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos)); // Atualiza o localStorage

    var container = document.getElementById('container');
    container.innerHTML = ''; // Limpa a lista de agendamentos

    agendamentos.forEach(function(dados, newIndex) {
      var serviceDiv = document.createElement('div');
      serviceDiv.className = 'service';
      serviceDiv.dataset.index = newIndex; // Novo índice após a exclusão
      serviceDiv.innerHTML = `
        <div class="item-container">
           <button class="but" type="submit" onclick="excluirServico(${newIndex})">EXCLUIR</button>
        </div>
        <li>Serviço: ${dados.servicoSelecionado}<br>
          Profissional: ${dados.imagemSelecionada}<br>
          Nome: ${dados.nome}<br>
          Email: ${dados.email}<br>
          Telefone: ${dados.telefone}<br>
          Data: ${dados.date}<br>
          Horário: ${dados.horario}
        </li>
      `;
      container.appendChild(serviceDiv);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Recupera os agendamentos armazenados no localStorage
    var agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    
    // Verifica se há agendamentos
    if (agendamentos.length === 0) {
        // Se não houver agendamentos, exibe a mensagem
        document.getElementById('no-appointments').style.display = 'block';
    } else {
        // Se houver agendamentos, exibe a lista de agendamentos
        var container = document.getElementById('container');
        // Código para exibir a lista de agendamentos...
    }
});

  //

