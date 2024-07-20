// Função para selecionar um trabalhador
function selectWorker(event, element, index) {
    event.preventDefault();
    let workers = JSON.parse(localStorage.getItem("workers")) || [];
    let selectedWorker = workers[index];
     // Remove a classe 'selected-worker' de todos os itens
    const items = document.querySelectorAll(".list-group-item");
    items.forEach((item) => {
    item.classList.remove("selected-worker");
    });
    // Adiciona a classe 'selected-worker' ao item clicado
    element.classList.add("selected-worker");
    localStorage.setItem("selectedWorker", JSON.stringify(selectedWorker));
    // Habilita o botão "Próximo" após selecionar um trabalhador
    document.getElementById("nextBtn").disabled = false;
}

// Carrega a lista de trabalhadores ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://127.0.0.1:5000/workers")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem("workers", JSON.stringify(data));
            const workerListContainer = document.getElementById("workerList");
            let htmlContent = '<div class="row">';
            data.forEach((worker, index) => {
                htmlContent += `
                    <div class="col-md-6 mb-3">
                        <a href="#" class="list-group-item list-group-item-action rounded" 
                            onclick="selectWorker(event, this, ${index})">
                            <div class="d-flex w-100 align-items-center">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Imagem de perfil de ${worker.name}" class="rounded me-3 border" style="width: 72px; height: 72px; object-fit: cover;">
                                <div>
                                    <h5 class="mb-1" id="worker-name">${worker.name}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
                // Fechar e abrir uma nova linha a cada 2 colunas
                if ((index + 1) % 2 === 0) {
                    htmlContent += '</div><div class="row">';
                }
            });
            htmlContent += '</div>'; // Fechar a última linha
            workerListContainer.innerHTML = htmlContent;
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
});
