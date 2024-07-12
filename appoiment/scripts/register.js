function registerClient() {
    const nome = document.getElementById('field-name').value;
    const email = document.getElementById('field-email').value;
    const telefone = document.getElementById('field-phone').value;
  
    const client = {
      name: nome,
      email: email,
      phone: telefone
    };
    
    console.log(client);

    if (!client.name || !client.email || !client.phone) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    localStorage.setItem('client', JSON.stringify(client));
    requestClientCreation(client);
  }

  function requestClientCreation(client) {
        // Envia os dados para o servidor
        fetch('http://127.0.0.1:5000/client', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(client)
        })
        .then(response => {
          if (response.ok) {
            // Registro bem-sucedido, redirecionar para a próxima página
            window.location.href = 'confirmation.html'; // Redireciona para a próxima página
          } else {
            // Registro falhou, tratar o erro conforme necessário
          if (response.status === 400) {
            requestAllClients();
            return
          }  
          throw new Error('Registro falhou');
          }
          
        })
        .catch(error => {
          // Tratar o erro de registro
          console.error('Erro ao registrar cliente:', error);
        });
}

function requestAllClients() {
  fetch('http://127.0.0.1:5000/clients')
    .then(response => response.json())
    .then(data => {
      console.log(data);

      var newClient = JSON.parse(localStorage.getItem('client'));

      if (!newClient) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      var allClients = data || [];

      var databaseClient = allClients.find(client => {
        return client.phone === newClient.phone && client.email === newClient.email;
      });

      localStorage.setItem('client', JSON.stringify(databaseClient));
      window.location.href = 'confirmation.html';
    })
    .catch(error => {
      console.error('Erro ao obter clientes:', error);
    });
}