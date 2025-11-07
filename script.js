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

// === HISTORIAL DE PRODUCTOS BUSCADOS ===
let historialProductos = JSON.parse(localStorage.getItem("historialProductos")) || [];

// Guardar un producto individual en el historial
function guardarProductoHistorial(producto) {
  if (!producto || !producto.nombre) return;

// Evitar duplicados por nombre
  const existe = historialProductos.some(p => p.nombre === producto.nombre);
  if (!existe) {
    historialProductos.unshift(producto); // Agregar al inicio
  }

// Limitar el historial a 12 productos
  if (historialProductos.length > 12) historialProductos = historialProductos.slice(0, 12);

  // Guardar en localStorage y actualizar vista
  localStorage.setItem("historialProductos", JSON.stringify(historialProductos));
  mostrarHistorialProductos();
}
// Guardar varios productos (desde una búsqueda)
function guardarHistorialProductos(lista) {
  if (!lista || lista.length === 0) return;
  lista.forEach(prod => guardarProductoHistorial(prod));
}

// Mostrar el slider de historial
function mostrarHistorialProductos() {
  const cont = document.getElementById("searchHistorySlider");
  if (!cont) return;

  cont.innerHTML = "";

  if (historialProductos.length === 0) {
    cont.innerHTML = `<p style="color:#666; padding:10px;">Aún no has visto ningún producto.</p>`;
    return;
  }

  historialProductos.forEach((p, index) => {
    const div = document.createElement("div");
    div.classList.add("slider-item");
    div.innerHTML = `
      <img src="${p.img}" alt="${p.nombre}">
      <h4>${p.nombre}</h4>
      <p>${p.precio} €</p>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
        <button class="buy-btn-small" data-nombre="${p.nombre}">🛒 Comprar</button>
        <button class="delete-btn" data-index="${index}" title="Eliminar">🗑</button>
      </div>
    `;
    cont.appendChild(div);
  });

  // Eliminar producto individualmente
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation(); // evita que se dispare el click del div
      const index = e.target.dataset.index;
      historialProductos.splice(index, 1);
      localStorage.setItem("historialProductos", JSON.stringify(historialProductos));
      mostrarHistorialProductos(); // refrescar el slider
    });
  });

  // Evento para agregar al carrito 
  document.querySelectorAll(".buy-btn-small").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const nombre = e.target.dataset.nombre;
      const prod = historialProductos.find(p => p.nombre === nombre);
      if (prod) {
        carrito.push(prod);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`🛒 "${prod.nombre}" añadido al carrito`);
      }
    });
  });
}
// Control de scroll del slider
document.getElementById("prevHistory").addEventListener("click", () => {
  document.getElementById("searchHistorySlider").scrollBy({ left: -200, behavior: "smooth" });
});
document.getElementById("nextHistory").addEventListener("click", () => {
  document.getElementById("searchHistorySlider").scrollBy({ left: 200, behavior: "smooth" });
});

// Mostrar historial al cargar
document.addEventListener("DOMContentLoaded", mostrarHistorialProductos);

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
        <button class="buy-btn" data-nombre="${p.nombre}" style="display:flex; align-items:center; gap:6px;">
          <img src="imagenes/imgLogo-transparente.png" style="width: 29px; height: 32px;">
          <span style="color: white;">Comprar ahora</span>
        </button>
      </div>
    `;

    //  Al hacer clic en el producto o su botón, lo añadimos al historial
    div.addEventListener("click", () => guardarProductoHistorial(p));   
    cont.appendChild(div);
  });

  // actualizar botones de paginación
  document.getElementById("prevBtn").disabled = paginaActual === 1;
  document.getElementById("nextBtn").disabled = fin >= lista.length;
}












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
  paginaActual = 1;
  mostrarProductos();

  // Guardar productos de esta búsqueda en el historial visual
  const resultados = productos.filter(p =>
    p.nombre.toLowerCase().includes(terminoBusqueda) ||
    p.categoria.toLowerCase().includes(terminoBusqueda) ||
    p.genero.toLowerCase().includes(terminoBusqueda)
  );

  if (resultados.length > 0) guardarHistorialProductos(resultados);
}

// Eventos: clic en la lupa o Enter
if (searchIcon) {
  searchIcon.addEventListener("click", buscarProducto);
}
if (searchInput) {
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") buscarProducto();
  });

  // si se borra todo el texto vuelve a mostrarlo todo
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

  // Guarda el producto en el historial al hacer clic en él
  
div.addEventListener("click", () => {
  guardarProductoHistorial(p);
});

  cont.appendChild(div);
});

  // Actualiza botones de paginación
  document.getElementById("prevBtn").disabled = paginaActual === 1;
  document.getElementById("nextBtn").disabled = fin >= lista.length;
}

// Botón: borrar historial completo
document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  if (confirm("¿Deseas borrar todo el historial de productos vistos?")) {
    historialProductos = [];
    localStorage.setItem("historialProductos", JSON.stringify(historialProductos));
    mostrarHistorialProductos();
  }
});




// Conectar con el whatsapp
// const whatsapp = document.getElementById("whatsapp-container");

// window.addEventListener("scroll", () => {
 //  if (window.scrollY > 300) {
 //    whatsapp.classList.add("show");
 //  } else {
 //    whatsapp.classList.remove("show");
 //  }
// });