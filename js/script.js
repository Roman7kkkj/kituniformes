// Animação de entrada dos produtos
document.addEventListener("DOMContentLoaded", () => {
  const produtos = document.querySelectorAll(".produto");
  produtos.forEach((p, i) => {
    setTimeout(() => {
      p.style.opacity = 1;
    }, 200 * i);
  });
});

// Efeito no cabeçalho ao rolar
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 30);
});
