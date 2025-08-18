const langBtn = document.getElementById("lang-btn");
const langMenu = document.getElementById("lang-menu");
const langLabel = document.getElementById("lang-label");
const elements = document.querySelectorAll("[data-i18n]");

const flagMap = {
  es: "https://flagcdn.com/es.svg",
  en: "https://flagcdn.com/gb.svg",
};
let currentLang = "es";

// Toggle menu
langBtn.addEventListener("click", () => {
  langMenu.classList.toggle("show");
});

// Select language
langMenu.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", () => {
    const selectedLang = li.dataset.lang;
    if (selectedLang !== currentLang) {
      currentLang = selectedLang;
      langLabel.textContent = currentLang.toUpperCase();
      langBtn.querySelector("img").src = flagMap[currentLang];
      updateTexts();
    }
    langMenu.classList.remove("show");

    cambiarIdioma(currentLang);
    cambiarIdiomaBoton(currentLang);

  });
});

// Update visible texts
function updateTexts() {
  elements.forEach((el) => {
    const key = el.dataset.i18n;
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.placeholder = translations[currentLang][key];
    } else {
      el.textContent = translations[currentLang][key];
    }
  });
}

// Carrito de compra
let cartCount = 0;

document.addEventListener("DOMContentLoaded", () => {
  const searchToggle = document.getElementById("search-toggle");
  const searchBox = document.getElementById("search-box");

  searchToggle.addEventListener("click", () => {
    searchBox.classList.toggle("visible");

    if (searchBox.classList.contains("visible")) {
      searchBox.focus();
    } else {
      searchBox.value = "";
    }
  });
});


// Mostrar/ocultar buscador en el header
document.getElementById("search-toggle").addEventListener("click", function () {
  const searchBox = document.getElementById("search-box");
  searchBox.classList.toggle("hidden");
  if (!searchBox.classList.contains("hidden")) {
    searchBox.focus();
  } else {
    searchBox.value = "";
    searchProductos();
  }
});

// Busqueda de productos
const productos1 = [
  { id: 1, nombre: "Camiseta", categoria: "ropa", genero: "hombre", precio: 15, destacado: true, imagen: "imagenes/camisetas.png" },
  { id: 2, nombre: "Pantalón", categoria: "ropa", genero: "hombre", precio: 25, destacado: false, imagen: "imagenes/pantalon.png" },
  { id: 3, nombre: "Vestido", categoria: "ropa", genero: "mujer", precio: 40, destacado: true, imagen: "imagenes/vestido.png" },
  { id: 4, nombre: "Smartphone", categoria: "electronica", genero: "todos", precio: 250, destacado: true, imagen: "imagenes/Smartphone.png" },
  { id: 5, nombre: "Laptop", categoria: "electronica", genero: "todos", precio: 800, destacado: true, imagen: "imagenes/laptop.png" },
  { id: 6, nombre: "Silla", categoria: "hogar", genero: "todos", precio: 45, destacado: false, imagen: "imagenes/silla.png" },
  { id: 7, nombre: "Zapatillas de Mujer", categoria: "calzado", genero: "mujer", precio: 50, destacado: true, imagen: "imagenes/zapatillas.png" },
  { id: 8, nombre: "Escritorio", categoria: "hogar", genero: "todos", precio: 90, destacado: true, imagen: "imagenes/escritorio.png" },
  { id: 9, nombre: "Reloj Inteligente", categoria: "electronica", genero: "todos", precio: 50, destacado: true, imagen: "imagenes/relojes.png" },
  { id: 10, nombre: "Zapatillas de Hombre", categoria: "calzado", genero: "hombre", precio: 50, destacado: true, imagen: "imagenes/zapatillas_hombre.png" },
];


const lista = document.getElementById("lista-productos");
const inputBusqueda = document.getElementById("search-box");
const mensaje = document.getElementById("mensaje");

function searchProductos(filtro = "") {
  lista.innerHTML = "";
  lista.appendChild(mensaje);
      mensaje.style.display = "none";
  const resultados = productos1.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  if (resultados.length === 0) {
        mensaje.style.display = "block"; // Mostrar mensaje si no hay productos
        return; }

  resultados.forEach(p => {
    const card = document.createElement("div");
    card.className = "producto";
    card.innerHTML = `
          <img src="${p.imagen}" alt="${p.nombre}">
          <h4>${p.nombre}</h4>
          <p>$${p.precio}</p>
          <button>Comprar</button>
        `;
    lista.appendChild(card);
  });
}

inputBusqueda.addEventListener("input", (e) => {
  searchProductos(e.target.value);
});

// Buscar producto
searchProductos();

// Slider

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  const offset = index * -100;
  document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  currentIndex = index;
}

function currentSlide(index) {
  showSlide(index);
}

// Auto-slide (optional)
setInterval(() => {
  let next = (currentIndex + 1) % slides.length;
  showSlide(next);
}, 6000);



// Filtrado

const productos = [
  { id: 1, nombre: "Camiseta", categoria: "ropa", genero: "hombre", precio: 15, destacado: true, imagen: "imagenes/camisetas.png" },
  { id: 2, nombre: "Pantalón", categoria: "ropa", genero: "hombre", precio: 25, destacado: false, imagen: "imagenes/pantalon.png" },
  { id: 3, nombre: "Vestido", categoria: "ropa", genero: "mujer", precio: 40, destacado: true, imagen: "imagenes/vestido.png" },
  { id: 4, nombre: "Smartphone", categoria: "electronica", genero: "todos", precio: 250, destacado: true, imagen: "imagenes/Smartphone.png" },
  { id: 5, nombre: "Laptop", categoria: "electronica", genero: "todos", precio: 800, destacado: true, imagen: "imagenes/laptop.png" },
  { id: 6, nombre: "Silla", categoria: "hogar", genero: "todos", precio: 45, destacado: false, imagen: "imagenes/silla.png" },
  { id: 7, nombre: "Zapatillas de Mujer", categoria: "calzado", genero: "mujer", precio: 50, destacado: true, imagen: "imagenes/zapatillas.png" },
  { id: 8, nombre: "Escritorio", categoria: "hogar", genero: "todos", precio: 90, destacado: true, imagen: "imagenes/escritorio.png" },
  { id: 9, nombre: "Reloj Inteligente", categoria: "electronica", genero: "todos", precio: 50, destacado: true, imagen: "imagenes/relojes.png" },
  { id: 10, nombre: "Zapatillas de Hombre", categoria: "calzado", genero: "hombre", precio: 50, destacado: true, imagen: "imagenes/zapatillas_hombre.png" },
];

function mostrarProductos(lista) {
  const contenedor = document.getElementById('lista-productos');
  contenedor.innerHTML = "";
  lista.forEach(prod => {
    const productoHTML = `
                <div class="producto">
                    <img src="${prod.imagen}" alt="${prod.nombre}">
                    <h4>${prod.nombre}</h4>
                    <p>$${prod.precio}</p>
                    <button>Comprar</button>
                </div>
            `;
    contenedor.innerHTML += productoHTML;
  });
}

function filtrarProductos() {
  const categoria = document.getElementById('categoria').value;
  const genero = document.getElementById('genero').value;
  const orden = document.getElementById('orden').value;
  const precioMin = parseFloat(document.getElementById('precio-min').value) || 0;
  const precioMax = parseFloat(document.getElementById('precio-max').value) || Infinity;

  let filtrados = productos.filter(p =>
    (categoria === "all" || p.categoria === categoria) &&
    (genero === "all" || p.genero === genero) &&
    p.precio >= precioMin &&
    p.precio <= precioMax
  );

  // Ordenamiento
  if (orden === "precio-asc") filtrados.sort((a, b) => a.precio - b.precio);
  if (orden === "precio-desc") filtrados.sort((a, b) => b.precio - a.precio);
  if (orden === "destacados") filtrados = filtrados.filter(p => p.destacado);
  // "Más recientes" -> orden original

  mostrarProductos(filtrados);
}

// Inicializar
mostrarProductos(productos);











