function registerClient() {
    const nome = document.getElementById('field-name').value;
    const email = document.getElementById('field-email').value;
    const telefone = document.getElementById('field-phone').value;
  
    const data = {
      name: nome,
      email: email,
      phone: telefone
    };
  
    fetch('http://127.0.0.1:5000/client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        // Registro bem-sucedido, redirecionar para a próxima página
        window.location.href = 'pag4.agendar.html'; // Redireciona para a próxima página
      } else {
        // Registro falhou, tratar o erro conforme necessário
        throw new Error('Registro falhou');
      }
    })
    .catch(error => {
      // Tratar o erro de registro
      console.error('Erro ao registrar cliente:', error);
    });
  }
  
  document.getElementById('btn-next').addEventListener('click', function() {
    registerClient();
  });