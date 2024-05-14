document.getElementById("icon").addEventListener("click", function(event) {
    // Verifica se o clique ocorreu diretamente no ícone
    if (event.target.id === "icon") {
        // Chama a função toggleIcon apenas se o clique foi no ícone
        toggleIcon(event.target);
    }
});

function toggleIcon(icon) {
    // Verifica se o ícone atual é o de adição ou de verificação
    if (icon.classList.contains("fa-plus")) {
        // Se for o ícone de adição, troca para o ícone de verificação
        icon.classList.remove("fa-plus", "selected");
        icon.classList.add("fa-check");
        localStorage.setItem('servicoSelecionado', icon.parentElement.nextElementSibling.textContent.trim());
    } else {
        // Se for o ícone de verificação, troca para o ícone de adição
        icon.classList.remove("fa-check");
        icon.classList.add("fa-plus", "selected");
        localStorage.removeItem('servicoSelecionado');
    }
    icon.classList.toggle("selected");
}
