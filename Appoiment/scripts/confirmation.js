function loadInformation() {
  var selectedService = JSON.parse(localStorage.getItem("selectedService"));
  var selectedWorker = JSON.parse(localStorage.getItem("selectedWorker"));
  var selectedDate = localStorage.getItem("selectedDateTime");
  var client = JSON.parse(localStorage.getItem("client"));
// Obtendo os elementos HTML
var dateElement = document.querySelector(".long-date");
var timeElement = document.getElementsByClassName("time");
var serviceElement = document.getElementsByClassName("service-name");
var workElement = document.getElementsByClassName("worker-name");
var clientNameElement = document.getElementsByClassName("client-name");
var clientEmailElement = document.getElementsByClassName("client-email");
var clientPhoneElement = document.getElementsByClassName("client-phone");
var priceElement = document.getElementsByClassName("price-total");
// Inserindo os valores nos elementos
dateElement.innerHTML = capitalizeFirstLetter(formatDate(selectedDate));
timeElement[0].innerHTML = formatTimeRange(selectedDate, selectedService.duration);
serviceElement[0].innerHTML = selectedService.name;
workElement[0].innerHTML = selectedWorker.name;
clientNameElement[0].innerHTML = client.name;
clientEmailElement[0].innerHTML = client.email;
clientPhoneElement[0].innerHTML = formatPhoneNumber(client.phone);
priceElement[0].innerHTML = formatPrice(selectedService.value);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatPrice(price) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatPhoneNumber(phoneNumber) {
  if (phoneNumber.length !== 11) {
      return "Número inválido";
  }
  const ddd = phoneNumber.slice(0, 2);
  const firstDigit = phoneNumber.slice(2, 3);
  const firstPart = phoneNumber.slice(3, 7);
  const secondPart = phoneNumber.slice(7);
  return `(${ddd}) ${firstDigit} ${firstPart}-${secondPart}`;
}

function formatTimeRange(startTime, duration) {
  // Converte a string de data e hora para um objeto Date
  const startDate = new Date(startTime);

  // Obtém as horas e os minutos iniciais
  const startHours = startDate.getHours();
  const startMinutes = startDate.getMinutes();

  // Calcula a hora final adicionando a duração
  const endDate = new Date(startDate.getTime() + duration * 60000);
  const endHours = endDate.getHours();
  const endMinutes = endDate.getMinutes();

  // Formata as horas e minutos com o sufixo "h"
  const startFormatted = `${startHours}:${startMinutes.toString().padStart(2, '0')}`;
  const endFormatted = `${endHours}:${endMinutes.toString().padStart(2, '0')}`;

  return `${startFormatted} - ${endFormatted}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);

  // Obtém o nome do dia da semana
  const optionsWeekday = { weekday: 'long' };
  const weekday = new Intl.DateTimeFormat('pt-BR', optionsWeekday).format(date);

  // Obtém o nome do mês e o dia
  const optionsDayMonth = { day: 'numeric', month: 'long' };
  const dayMonth = new Intl.DateTimeFormat('pt-BR', optionsDayMonth).format(date);

  // Formata a data completa
  return `${weekday}, ${dayMonth}`;
}

function confirmAppointment() {
  var selectedService = JSON.parse(localStorage.getItem("selectedService"));
  var selectedWorker = JSON.parse(localStorage.getItem("selectedWorker"));
  var selectedDate = localStorage.getItem("selectedDate");
  var client = JSON.parse(localStorage.getItem("client"));

  const parameters = {
    service_id: selectedService.id,
    client_id: client.id,
    worker_id: selectedWorker.id,
    start_time: selectedDate,
  };

  console.log(parameters);
  requestAppointment(parameters);
}

function requestAppointment(parameters) {
  fetch("http://127.0.0.1:5000/appointment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parameters),
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Processar a resposta JSON
      } else if (response.status === 409) {
        throw new Error("Horário indisponível");
      } else if (response.status === 404) {
        throw new Error("Serviço, cliente ou trabalhador não encontrado");
      } else {
        throw new Error("Erro na criação do agendamento");
      }
    })
    .then((data) => {
      // Reserva bem-sucedida
      alert("Reserva bem-sucedida");
      console.log("Agendamento criado:", data.appointment); // Detalhes do agendamento
      // Redirecionar ou atualizar a UI conforme necessário
    })
    .catch((error) => {
      // Tratar o erro de reserva
      console.error("Erro ao confirmar reserva:", error);
      alert(error.message); // Mostrar mensagem de erro ao usuário
    });
}
