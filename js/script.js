// =========================================================
//  ANIMAÇÃO DE ENTRADA DOS PRODUTOS
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const produtos = document.querySelectorAll(".produto");
  produtos.forEach((p, i) => {
    setTimeout(() => {
      p.classList.add("visible");
    }, 150 * i);
  });
});

// =========================================================
//  EFEITO STICKY NO CABEÇALHO
// =========================================================
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 30);
});

// =========================================================
//  PESQUISA DE PRODUTOS
// =========================================================
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const produtos = document.querySelectorAll('.produto');
const noResults = document.getElementById('no-results');

function searchProducts() {
  const query = searchInput.value.trim().toLowerCase();
  let encontrados = 0;

  produtos.forEach(prod => {
    const title = prod.querySelector('h2').innerText.toLowerCase();
    if(title.includes(query)) {
      prod.style.display = 'block';
      encontrados++;
    } else {
      prod.style.display = 'none';
    }
  });

  noResults.style.display = encontrados === 0 ? 'block' : 'none';

  // Se input estiver vazio, mostra todos os produtos
  if(query === "") {
    produtos.forEach(prod => prod.style.display = 'block');
    noResults.style.display = 'none';
  }
}

// Eventos de pesquisa
searchButton.addEventListener('click', searchProducts);
searchInput.addEventListener('keypress', e => {
  if(e.key === 'Enter') searchProducts();
});

// =========================================================
//  FILTRO DE CATEGORIAS
// =========================================================
const categoriasButton = document.getElementById('categorias-button');
const categoriasDropdown = document.getElementById('categorias-dropdown');
const categoriaLinks = document.querySelectorAll('.categoria-link');

categoriasButton.addEventListener('click', () => {
  categoriasDropdown.style.display = categoriasDropdown.style.display === 'block' ? 'none' : 'block';
});

function filtrarCategoria(categoria) {
  let encontrado = false;

  produtos.forEach(prod => {
    if (categoria === 'todas' || prod.dataset.categoria === categoria) {
      prod.style.display = 'block';
      encontrado = true;
    } else {
      prod.style.display = 'none';
    }
  });

  noResults.style.display = encontrado ? 'none' : 'block';
}

// Evento click nos links do dropdown
categoriaLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const cat = link.getAttribute('href').substring(1);
    filtrarCategoria(cat);
    history.replaceState(null, null, '#' + cat);
  });
});

// Filtrar automaticamente se URL já tiver hash
window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1);
  if (hash) filtrarCategoria(hash);
});
