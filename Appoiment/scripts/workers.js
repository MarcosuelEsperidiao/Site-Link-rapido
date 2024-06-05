function selectImage(imagem) {
    var divs = document.querySelectorAll('.profile .worker');
    
    console.log(divs);

       // Verifica se a imagem já está selecionada
    if (imagem.parentElement.classList.contains("selecionada")) {
        imagem.parentElement.classList.remove("selecionada");
        return; // Sai da função, pois já desmarcamos a imagem
    }

    divs.forEach(function(div) {
        if (div.querySelector('image') !== imagem) {
            div.classList.remove("selecionada");
            console.log("Selecionando");
        }
    });

    imagem.parentElement.classList.toggle("selecionada");
}

function sendInformation() {
    // Obtém o profissional selecionado
    var profissionalSelecionado = document.querySelector('.par .selecionada img');
    var profissionalNome = profissionalSelecionado ? profissionalSelecionado.alt : '';

    // Verifica qual imagem foi selecionada e define os horários correspondentes
    var profile;
    switch (worker) {
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
    localStorage.setItem('selectImage', profissionalNome);
    localStorage.setItem('horarios-disponiveis', JSON.stringify(horariosDisponiveis));
}