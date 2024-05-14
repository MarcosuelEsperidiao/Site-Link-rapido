AOS.init();

window.onload = function () {
    window.addEventListener('scroll', function (e) {
        if (window.pageYOffset > 100) {
            document.querySelector("header").classList.add('is-scrolling');
        } else {
            document.querySelector("header").classList.remove('is-scrolling');
        }
    });

    // Função para adicionar event listeners aos botões do menu
    function addMenuButtonListeners(buttons, sections) {
        console.log('Adicionando');
        console.log('Botões:', buttons);
        console.log('Seções:', sections);
    
        buttons.forEach((button, index) => {
            button.addEventListener('click', function(event) {
                scrollToServiceSection(event, sections[index]);
            });
        });
    }
    

const menuButton = document.querySelector('.hamburger');
const mobileNavigation = document.querySelector('.mobile-nav');
const webNavigation = document.querySelector('.web-nav');

// Botões do menu web
const webButtons = [
    webNavigation.querySelector('#about-btn'),
    webNavigation.querySelector('#service-btn'),
    webNavigation.querySelector('#location-btn'),
    webNavigation.querySelector('#photos-btn')
];

// Botões do menu mobile
const mobileButtons = [
    mobileNavigation.querySelector('#about-btn'),
    mobileNavigation.querySelector('#service-btn'),
    mobileNavigation.querySelector('#location-btn'),
    mobileNavigation.querySelector('#photos-btn')
];

// Definindo as seções
const sections = [
    document.getElementById('about'),
    document.getElementById('services'),
    document.getElementById('location'),
    document.getElementById('photos')
];

// Adicionando event listeners para os botões do menu web
addMenuButtonListeners(webButtons, sections);

// Adicionando event listeners para os botões do menu mobile
addMenuButtonListeners(mobileButtons, sections);

menuButton.addEventListener('click', function () {
    menuButton.classList.toggle('is-active');
    mobileNavigation.classList.toggle('is-active');
    document.body.style.overflow = menuButton.classList.contains('is-active') ? 'hidden' : 'auto';
    console.log("Abrindo Menu");
});

function scrollToServiceSection(event, section) {
    event.preventDefault();
    mobileNavigation.classList.remove('is-active');
    menuButton.classList.remove('is-active');
    document.body.style.overflow = menuButton.classList.contains('is-active') ? 'hidden' : 'auto';
    section.scrollIntoView({ behavior: 'smooth' });
    console.log("Movendo");
}
}