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


// LISTA DE PRODUCTOS
const productos = [
  { nombre: "Camiseta básica", categoria: "Ropa", genero: "Hombre", precio: 20, img: "imagenes/camisetas.png" },
  { nombre: "Zapatillas deportivas", categoria: "Calzado", genero: "Mujer", precio: 60, img: "imagenes/zapatillas.png" },
  { nombre: "Auriculares Bluetooth", categoria: "Electrónica", genero: "Todos", precio: 45, img: "imagenes/auriculares.png" },
  { nombre: "Pantalón vaquero", categoria: "Ropa", genero: "Hombre", precio: 40, img: "imagenes/pantalon.png" },
  { nombre: "Bolso de cuero", categoria: "Hogar", genero: "Mujer", precio: 90, img: "imagenes/bolso_cuero.png" },
  { nombre: "Sudadera oversize", categoria: "Ropa", genero: "Mujer", precio: 35, img: "imagenes/sudadera.png" },
  { nombre: "Reloj inteligente", categoria: "Electrónica", genero: "Todos", precio: 120, img: "imagenes/relojes.png" },
  { nombre: "Zapatos de vestir", categoria: "Calzado", genero: "Hombre", precio: 70, img: "imagenes/calzado_vestir.png" },
  { nombre: "Cafetera", categoria: "Hogar", genero: "Todos", precio: 110, img: "imagenes/cafetera.png" },
  { nombre: "Auriculares Pro", categoria: "Electrónica", genero: "Todos", precio: 180, img: "imagenes/auricularespro.png" },
  { nombre: "Chaqueta impermeable", categoria: "Ropa", genero: "Hombre", precio: 55, img: "imagenes/chaqueta impermiable.png" },
  { nombre: "Sandalias verano", categoria: "Calzado", genero: "Mujer", precio: 30, img: "imagenes/sandalia_verano.png" },
  { nombre: "Silla", categoria: "Hogar", genero: "Todos", precio: 110, img: "imagenes/silla1.png" },
  { nombre: "Laptop", categoria: "Electrónica", genero: "Todos", precio: 180, img: "imagenes/laptop.png" },
  { nombre: "Smartphone", categoria: "Electrónica", genero: "Todos", precio: 55, img: "imagenes/Smartphone.png" },
];

// BUSCADOR DE PRODUCTOS ===
const searchInput = document.getElementById("searchInput");
const searchIcon = document.getElementById("searchIcon");
const productsContainer = document.getElementById("productsContainer");

// === HISTORIAL DE BÚSQUEDA ===
let historialBusquedas = JSON.parse(localStorage.getItem("historialBusquedas")) || [];

function guardarBusqueda(termino) {
  if (!termino) return;
  termino = termino.toLowerCase();
  // Evitar duplicados
  if (!historialBusquedas.includes(termino)) {
    historialBusquedas.unshift(termino); // al principio
    if (historialBusquedas.length > 8) historialBusquedas.pop(); // máximo 8
    localStorage.setItem("historialBusquedas", JSON.stringify(historialBusquedas));
  }
  mostrarHistorial();
}

function mostrarHistorial() {
  const contHistorial = document.getElementById("searchHistory");
  contHistorial.innerHTML = "";
  historialBusquedas.forEach(term => {
    const li = document.createElement("li");
    li.textContent = term;
    li.addEventListener("click", () => {
      searchInput.value = term;
      buscarProducto();
    });
    contHistorial.appendChild(li);
  });
}

// Mostrar historial al cargar
document.addEventListener("DOMContentLoaded", mostrarHistorial);


//  VARIABLES GLOBALES
let filtros = { categoria: "all", genero: "all", precio: "relevancia" };
let paginaActual = 1;
const productosPorPagina = 10;
let terminoBusqueda = "";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// BOTONES DE PAGINACIÓN
document.getElementById("prevBtn").addEventListener("click", () => {
  if (paginaActual > 1) {
    paginaActual--;
    mostrarProductos();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  paginaActual++;
  mostrarProductos();
});

// Mostrar primera página al cargar
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
});

// FUNCIÓN DE BÚSQUEDA 
function buscarProducto() {
  terminoBusqueda = searchInput.value.trim().toLowerCase();
  if (terminoBusqueda !== "") {
    guardarBusqueda(terminoBusqueda);
  }
  paginaActual = 1;
  mostrarProductos();
}

// Eventos: clic en la lupa o Enter
if (searchIcon) {
  searchIcon.addEventListener("click", buscarProducto);
}
if (searchInput) {
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") buscarProducto();
  });

  // si borra todo el texto → volver a mostrar todo
  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
      terminoBusqueda = "";
      paginaActual = 1;
      mostrarProductos();
    }
  });
}

// FILTROS 

document.querySelectorAll(".dropdown").forEach(drop => {
  const button = drop.querySelector(".dropbtn");
  const menu = drop.querySelector(".dropdown-content");
  const tipo = drop.dataset.filter;

  button.addEventListener("click", e => {
    e.stopPropagation();
    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("show"));
    drop.classList.toggle("show");
  });

  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      filtros[tipo] = a.dataset.value;
      button.textContent = `${a.textContent} ▾`;
      drop.classList.remove("show");
      paginaActual = 1;
      mostrarProductos();
    });
  });
});

function mostrarProductos() {
  const cont = document.getElementById("productsContainer");
  cont.innerHTML = "";

  // filtros por categoría y género
  let lista = productos.filter(p =>
    (filtros.categoria === "all" || p.categoria === filtros.categoria) &&
    (filtros.genero === "all" || p.genero === filtros.genero)
  );

  // aplicar búsqueda si hay texto
  if (terminoBusqueda) {
    lista = lista.filter(p =>
      p.nombre.toLowerCase().includes(terminoBusqueda) ||
      p.categoria.toLowerCase().includes(terminoBusqueda) ||
      p.genero.toLowerCase().includes(terminoBusqueda)
    );
  }

  // ordenar por precio
  if (filtros.precio === "asc") lista.sort((a, b) => a.precio - b.precio);
  else if (filtros.precio === "desc") lista.sort((a, b) => b.precio - a.precio);

  // si no hay nada que mostrar
  if (lista.length === 0) {
    cont.innerHTML = `<p style="text-align:center; font-size:18px; color:#666;">No se encontraron productos.</p>`;
    document.getElementById("prevBtn").disabled = true;
    document.getElementById("nextBtn").disabled = true;
    return;
  }

  // paginación
  const inicio = (paginaActual - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const pagina = lista.slice(inicio, fin);

  // recorre productos de esta página
  pagina.forEach(p => {
  const div = document.createElement("div");
  div.classList.add("product");

  div.innerHTML = `
    <img src="${p.img}" alt="${p.nombre}">
    <h4>${p.nombre}</h4>     
    <p class="price"><strong>${p.precio} €</strong></p>
    <div style="display:flex; gap:6px; margin-top:8px;">        
      <button class="buy-btn" style="display:flex; align-items:center; gap:6px;">
        <img src="imagenes/imgLogo-transparente.png" style="width: 29px; height: 32px;">
        <span style="color: white;">Comprar ahora</span>
      </button>
    </div>
  `;

  // ✅ Nuevo: guardar el producto en el historial al hacer clic en él
  div.addEventListener("click", () => {
    guardarBusqueda(p.nombre);
  });

  cont.appendChild(div);
});

  // actualizar botones de paginación
  document.getElementById("prevBtn").disabled = paginaActual === 1;
  document.getElementById("nextBtn").disabled = fin >= lista.length;
}






// Conectar con el whatsapp
// const whatsapp = document.getElementById("whatsapp-container");

// window.addEventListener("scroll", () => {
 //  if (window.scrollY > 300) {
 //    whatsapp.classList.add("show");
 //  } else {
 //    whatsapp.classList.remove("show");
 //  }
// });