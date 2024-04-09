AOS.init();

window.onload = function () {
    window.addEventListener('scroll', function (e) {
        if (window.pageYOffset > 100) {
            document.querySelector("header").classList.add('is-scrolling');
        } else {
            document.querySelector("header").classList.remove('is-scrolling');
        }
    });

    // Botões da barra de navegação
    const menuButton = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-nav');

    // Botões do menu mobile
    const homeButton = mobileMenu.querySelector('#home-btn');
    const aboutButton = mobileMenu.querySelector('#about-btn');
    const serviceButton = mobileMenu.querySelector('#service-btn');
    const locationButton = mobileMenu.querySelector('#location-btn');
    const photosButton = mobileMenu.querySelector('#photos-btn');

    // Definindo as seções
    const homeSection = document.getElementById('home');
    const aboutSection = document.getElementById('about');
    const serviceSection = document.getElementById('services');
    const locationSection = document.getElementById('location');
    const photosSection = document.getElementById('photos');

    // Adicionando event listener para os botões do menu mobile
    homeButton.addEventListener('click', function(event) {
        scrollToServiceSection(event, homeSection);
    });

    aboutButton.addEventListener('click', function(event) {
        scrollToServiceSection(event, aboutSection);
    });

    serviceButton.addEventListener('click', function(event) {
        scrollToServiceSection(event, serviceSection);
    });

    locationButton.addEventListener('click', function(event) {
        scrollToServiceSection(event, locationSection);
    });

    photosButton.addEventListener('click', function(event) {
        scrollToServiceSection(event, photosSection);
    });
	
    menuButton.addEventListener('click', function () {
        menuButton.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-active');
        // Habilitando ou desabilitando o scroll da página.
        document.body.style.overflow = menuButton.classList.contains('is-active') ? 'hidden' : 'auto';
        console.log("Abrindo Menu")
    });

    function scrollToServiceSection(event, section) {
        event.preventDefault();
        mobileMenu.classList.remove('is-active');
        menuButton.classList.remove('is-active');
        document.body.style.overflow = menuButton.classList.contains('is-active') ? 'hidden' : 'auto';
        section.scrollIntoView({ behavior: 'smooth'});
        console.log("Movendo")
    }
}