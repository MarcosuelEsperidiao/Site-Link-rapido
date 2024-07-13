const slides = document.querySelectorAll('.slide');
const slideIndicatorsContainer = document.querySelector('.slide-indicators');

let currentSlide = 0;

function showSlide() {
    slides.forEach(slide => slide.style.display = 'none');
    slides[currentSlide].style.display = 'block';
    updateSlideIndicators(); // Atualiza os indicadores de slide
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; 
    showSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 3000); 
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function updateSlideIndicators() {
    const indicators = Array.from(document.querySelectorAll('.slide-indicator'));
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Exibição inicial
showSlide();
startAutoSlide();

// Adiciona indicadores de slide
slides.forEach((slide, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('slide-indicator');
    if (index === 0) {
        indicator.classList.add('active');
    }
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide();
        document.getElementById ("radio1").checked = true;
    });
    slideIndicatorsContainer.appendChild(indicator);
});

// Adiciona botões de navegação
const controlsContainer = document.createElement('div');
controlsContainer.classList.add('slider-controls');

const prevButton = document.createElement('button');
const prevButtonImg = document.createElement('img');
prevButtonImg.src = 'assets/chevron-left.pdf';
prevButton.appendChild(prevButtonImg);
prevButton.addEventListener('click', prevSlide);

const nextButton = document.createElement('button');
const nextButtonImg = document.createElement('img');
nextButtonImg.src = 'assets/chevron-right.pdf';
nextButton.appendChild(nextButtonImg);
nextButton.addEventListener('click', nextSlide);

controlsContainer.appendChild(prevButton);
controlsContainer.appendChild(nextButton);

document.querySelector('.slider-container').appendChild(controlsContainer);