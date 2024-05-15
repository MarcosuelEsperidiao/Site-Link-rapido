function selectImage(imagem) {
    var divs = document.querySelectorAll('.par div'); // Seleciona todas as divs dentro de .par
    divs.forEach(function(div) {
        if (div.querySelector('img') !== imagem) { // Desmarca todas as outras divs
            div.classList.remove("selecionada");
        }
    });
    imagem.parentElement.classList.toggle("selecionada"); // Seleciona a div pai da imagem clicada

    // Atualiza a imagem mostrada na parte inferior da tela
    var imagemSelecionada = document.getElementById("imagem-selecionada");
    imagemSelecionada.innerHTML = ''; // Limpa qualquer conteúdo anterior
    var novaImagem = document.createElement("img");
    novaImagem.src = imagem.src;
    novaImagem.alt = imagem.alt;
    imagemSelecionada.appendChild(novaImagem);

    // Mostra o nome da imagem selecionada
    var nomeImagemSelecionada = document.getElementById("nome-imagem-selecionada");
    nomeImagemSelecionada.textContent = imagem.alt;
}

function sendInformation() {
    // Obtém o profissional selecionado
    var profissionalSelecionado = document.querySelector('.par .selecionada img');
    var profissionalNome = profissionalSelecionado ? profissionalSelecionado.alt : '';

    // Verifica qual imagem foi selecionada e define os horários correspondentes
    var horariosDisponiveis;
    switch (profissionalNome) {
        case 'Marcos':
            horariosDisponiveis = ["09:00","10:00", "11:00", "12:00"];
            break;
        case 'Victor':
            horariosDisponiveis = ["10:00", "11:00", "12:00"];
            break;
        case 'Samy':
            horariosDisponiveis = ["11:00", "12:00", "13:00"];
            break;
        case 'Luiz':
            horariosDisponiveis = ["12:00", "13:00", "14:00"];
            break;
        default:
            horariosDisponiveis = [];
    }

    // Armazena o profissional selecionado e os horários disponíveis no localStorage
    localStorage.setItem('imagem-selecionada', profissionalNome);
    localStorage.setItem('horarios-disponiveis', JSON.stringify(horariosDisponiveis));
}
