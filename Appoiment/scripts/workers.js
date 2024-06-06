function selectImage(imagem) {
    var divs = document.querySelectorAll('.profile .worker');

    // Verifica se a imagem já está selecionada
    if (imagem.parentElement.classList.contains("selected")) {
        imagem.parentElement.classList.remove("selected");
        return;
    }

    divs.forEach(function(div) {
        if (div.querySelector('image') !== imagem) {
            div.classList.remove("selected");
        }
    });

    imagem.parentElement.classList.toggle("selected");
}

function sendInformation() {
    // Obtém o profissional selecionado
    var selectedProfessional = document.querySelector('.profile .worker.selected img');
    var name = selectedProfessional ? selectedProfessional.alt : '';

    let availableTimes = [];
    switch (name) {
        case 'Marcos':
            availableTimes = ["09:00", "10:00", "11:00", "12:00"];
            break;
        case 'Victor':
            availableTimes = ["10:00", "11:00", "12:00"];
            break;
        case 'Samy':
            availableTimes = ["11:00", "12:00", "13:00"];
            break;
        case 'Luiz':
            availableTimes = ["12:00", "13:00", "14:00"];
            break;
        default:
            availableTimes = [];
    }

    console.log(name);
    console.log(availableTimes);

    // Armazena o profissional selecionado e os horários disponíveis no localStorage
    localStorage.setItem('selected-worker', name);
    localStorage.setItem('available-times', JSON.stringify(availableTimes));
}