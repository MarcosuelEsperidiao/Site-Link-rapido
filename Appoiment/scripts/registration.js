document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("phoneInput").addEventListener("input", function (e) {
    var x = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2]
      ? x[1]
      : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
  });
});

function validateCustomerData() {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const phone = document
    .getElementById("phoneInput")
    .value.replace(/[^0-9]/g, "");

  const client = {
    name: name,
    email: email,
    phone: phone,
  };

  console.log(client);

  if (!client.name || !client.email || !client.phone) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }
  localStorage.setItem("client", JSON.stringify(client));
  //requestClientCreation(client);
  return true;
}

function requestClientCreation(client) {
  // Envia os dados para o servidor
  fetch("http://127.0.0.1:5000/client", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Extrai o JSON da resposta
      } else {
        // Registro falhou, tratar o erro conforme necessário
        if (response.status === 400) {
          requestAllClients();
          return;
        }
        throw new Error("Registro falhou");
      }
    })
    .then((data) => {
      // Salva o cliente localmente
      if (data && data.client) {
        localStorage.setItem("client", JSON.stringify(data.client));
      }
    })
    .catch((error) => {
      // Tratar o erro de registro
      console.error("Erro ao registrar cliente:", error);
    });
}

function requestAllClients() {
  fetch("http://127.0.0.1:5000/clients")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      var newClient = JSON.parse(localStorage.getItem("client"));

      if (!newClient) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      var allClients = data || [];

      var databaseClient = allClients.find((client) => {
        return (
          client.phone === newClient.phone && client.email === newClient.email
        );
      });

      localStorage.setItem("client", JSON.stringify(databaseClient));
    })
    .catch((error) => {
      console.error("Erro ao obter clientes:", error);
    });
}
