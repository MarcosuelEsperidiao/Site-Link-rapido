localStorage.removeItem('selectedServices');

// Seleciona todos os elementos com a classe "icon" (assumindo que há mais de um)
const icons = document.getElementsByClassName("icon");

// Itera sobre todos os elementos selecionados para adicionar o listener de evento
Array.from(icons).forEach(icon => {
    icon.addEventListener("click", function(event) {
        // Verifica se o clique ocorreu diretamente no ícone
        if (event.target.classList.contains("icon")) {
            // Chama a função toggleIcon apenas se o clique foi no ícone
            toggleIcon(event.target);
        }
    });
});

function toggleIcon(icon) {
  // Verifica se o ícone atual é o de adição ou de verificação
  var selectedServices = JSON.parse(localStorage.getItem('selectedServices')) || [];
  var serviceName = icon.parentElement.nextElementSibling.textContent.trim();
  // Verifica se o serviço já está selecionado
  var selectedIndex = selectedServices.findIndex(service => service.name === serviceName);

  if (icon.classList.contains("fa-plus")) {
      // Se for o ícone de adição, troca para o ícone de verificação
      icon.classList.remove("fa-plus", "selected");
      icon.classList.add("fa-check");

      // Adiciona o serviço selecionado ao array de serviços selecionados
      selectedServices.push({ name: serviceName });
  } else {
      // Se for o ícone de verificação, troca para o ícone de adição
      icon.classList.remove("fa-check");
      icon.classList.add("fa-plus", "selected");
      // Remove o serviço selecionado do array de serviços selecionados
          selectedServices.splice(selectedIndex, 1);
  }
  // Atualiza a lista de serviços selecionados no localStorage
  localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
  icon.classList.toggle("selected");
  console.log(selectedServices);
}

function goToWorkerList() {
  var selectedServices = JSON.parse(localStorage.getItem('selectedServices')) || [];
  console.log('Serviço selecionado:', selectedServices);

  if (selectedServices.length > 0) {
    window.location.href = 'list-workers.html';
  } else {
    alert('Por favor, selecione um serviço antes de avançar.');
  }
}

fetch('http://127.0.0.1:5000/services')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
      const container = document.getElementById('container-services');
      container.innerHTML = data.map(service => `
        <div id="item-service" class="service">
          <div class="item-container">
              <i id="icon" class="fas fa-plus icon" onclick="toggleIcon(this)"></i>
          </div>
          <li>${service.name}<br>
            <h3 class="time">${service.duration} minutos</h3> 
            <h3 class="value">R$ ${service.value}</h3>
          </li>
        </div>
      `).join('');
    })
    .catch(error => {
      console.error('Fetch error:', error);
});