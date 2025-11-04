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

//  VARIABLES GLOBALES
let filtros = { categoria: "all", genero: "all", precio: "relevancia" };
let paginaActual = 1;
const productosPorPagina = 10;
let terminoBusqueda = "";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// FUNCIÓN DE BÚSQUEDA 
function buscarProducto() {
  terminoBusqueda = searchInput.value.trim().toLowerCase();
  paginaActual = 1;             // cuando buscas, vuelve a la página 1
  mostrarProductos();           // vuelve a pintar pero ya filtrando por búsqueda
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

// === BOTÓN "APLICAR FILTROS" ===
const applyFiltersBtn = document.getElementById("applyFilters");

if (applyFiltersBtn) {
  applyFiltersBtn.addEventListener("click", () => {
    paginaActual = 1; // reinicia a la primera página
    mostrarProductos(); // actualiza la vista según los filtros seleccionados
  });
}
window.addEventListener("click", () => document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("show")));

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
      <p class="category">${p.categoria}</p>
      <p class="price"><strong>${p.precio} €</strong></p>
      <div style="display:flex; gap:6px; margin-top:8px;">        
        <button class="buy-btn" style="display:flex; align-items:center; gap:6px;">
          <img src="imagenes/imgLogo-transparente.png" style="width: 29px; height: 32px;">
          <span style="color: white;">Comprar ahora</span>
        </button>
      </div>
    `;

    // añade al historial de búsqueda si hay término activo
    if (terminoBusqueda && typeof addProductToHistory === "function") {
      addProductToHistory({
        nombre: p.nombre,
        categoria: p.categoria,
        precio: p.precio,
        imagen: p.img
      });
    }

    //  añade los más vistos cuando el usuario lo ve o hace clic
    div.addEventListener("click", () => {
      if (typeof addProductToMostViewed === "function") {
        addProductToMostViewed({
          nombre: p.nombre,
          categoria: p.categoria,
          precio: p.precio,
          imagen: p.img
        });
      }
    });

    cont.appendChild(div);
  });

  // actualizar botones de paginación
  document.getElementById("prevBtn").disabled = paginaActual === 1;
  document.getElementById("nextBtn").disabled = fin >= lista.length;
}

// === HISTORIAL DE PRODUCTOS BUSCADOS ===
const searchHistorySlider = document.getElementById("searchHistorySlider");
const historyPrev = document.getElementById("historyPrev");
const historyNext = document.getElementById("historyNext");
const clearHistoryBtn = document.getElementById("clearHistory");

// Guardar un producto en el historial
function addProductToHistory(product) {
  if (!product || !product.nombre) return;

  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  // Evitar duplicados por nombre
  history = history.filter(item => item.nombre !== product.nombre);
  history.unshift(product); // agrega al inicio
  if (history.length > 10) history.pop(); // máximo 10 productos

  localStorage.setItem("searchHistory", JSON.stringify(history));
  renderProductHistory();
}

// Renderizar historial de productos
function renderProductHistory() {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchHistorySlider.innerHTML = "";

  if (history.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.classList.add("no-history");
    emptyMessage.textContent = "Aún no tienes búsquedas recientes.";
    searchHistorySlider.appendChild(emptyMessage);
    return;
  }

  history.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("history-product");
    card.innerHTML = `
      <button class="remove-btn">×</button>
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <div class="history-product-info">
        <h4>${prod.nombre}</h4>
        <p>${prod.categoria}</p>
        <p class="price">${prod.precio} €</p>
        <button class="buy-now-btn">Comprar ahora</button>
      </div>
    `;

    // Eliminar producto del historial
    card.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromHistory(prod.nombre);
    });

    // Acción de comprar
    card.querySelector(".buy-now-btn").addEventListener("click", () => {
      alert(`Has comprado: ${prod.nombre}`);
    });

    searchHistorySlider.appendChild(card);
  });
}

// Eliminar producto individual
function removeFromHistory(nombre) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  history = history.filter(p => p.nombre !== nombre);
  localStorage.setItem("searchHistory", JSON.stringify(history));
  renderProductHistory();
}

// Eliminar todo el historial
if (clearHistoryBtn) {
  clearHistoryBtn.addEventListener("click", () => {
    localStorage.removeItem("searchHistory");
    renderProductHistory();
  });
}

// Flechas del slider
if (historyPrev && historyNext) {
  historyPrev.addEventListener("click", () => {
    searchHistorySlider.scrollBy({ left: -250, behavior: "smooth" });
  });

  historyNext.addEventListener("click", () => {
    searchHistorySlider.scrollBy({ left: 250, behavior: "smooth" });
  });
}

// Inicializar historial al cargar
document.addEventListener("DOMContentLoaded", renderProductHistory);


// CARRITO

function agregarAlCarrito(producto) {
  const index = carrito.findIndex(item => item.nombre === producto.nombre);
  if (index >= 0) carrito[index].cantidad++;
  else carrito.push({ ...producto, cantidad: 1 });

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();

  const msg = document.createElement("div");
  msg.textContent = `🛍️ ${producto.nombre} añadido al carrito`;
  msg.classList.add("cart-toast");
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
}

function eliminarDelCarrito(producto) {
  carrito = carrito.filter(item => item.nombre !== producto.nombre);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

function actualizarCarrito() {
  const cont = document.getElementById("cartItems");
  const totalElem = document.getElementById("cartTotal");
  const countElem = document.getElementById("cart-count");

  cont.innerHTML = "";
  let total = 0;
  let count = 0;
  carrito.forEach(item => {
    total += item.precio * item.cantidad;
    count += item.cantidad;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.nombre}">
      <div class="cart-item-info">
        <h4>${item.nombre}</h4>
        <p>${item.precio} € x ${item.cantidad}</p>
      </div>
      <button class="removeItem"><i class="fas fa-trash" style="color:red;"></i></button>
    `;
    div.querySelector(".removeItem").addEventListener("click", () => eliminarDelCarrito(item));
    cont.appendChild(div);
  });

  totalElem.textContent = carrito.length > 0 ? `Total: ${total.toFixed(2)} €` : "Tu carrito está vacío";
  countElem.textContent = count;
}


//  EVENTOS

document.getElementById("applyFilters").addEventListener("click", () => {
  paginaActual = 1;
  mostrarProductos();
});
document.getElementById("prevBtn").addEventListener("click", () => {
  if (paginaActual > 1) { paginaActual--; mostrarProductos(); }
});
document.getElementById("nextBtn").addEventListener("click", () => {
  paginaActual++; mostrarProductos();
});

document.getElementById("cart-btn").addEventListener("click", () => {
  const panel = document.getElementById("cartPanel");
  panel.classList.toggle("open");
});
document.getElementById("checkoutBtn").addEventListener("click", () => {
  alert("Gracias por tu compra 🛒");
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarCarrito();
  document.getElementById("cartPanel").classList.remove("open");
});


//  INICIALIZACIÓN

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
  actualizarCarrito();
});


// === SECCIÓN DE LOS MÁS VISTOS ===
const mostViewedSlider = document.getElementById("mostViewedSlider");
const viewedPrev = document.getElementById("viewedPrev");
const viewedNext = document.getElementById("viewedNext");
const clearViewedBtn = document.getElementById("clearViewed");

// Guardar un producto en los más vistos
function addProductToMostViewed(product) {
  if (!product || !product.nombre) return;

  let viewed = JSON.parse(localStorage.getItem("mostViewed")) || [];

  // Evita duplicados
  viewed = viewed.filter(item => item.nombre !== product.nombre);
  viewed.unshift(product);
  if (viewed.length > 10) viewed.pop();

  localStorage.setItem("mostViewed", JSON.stringify(viewed));
  renderMostViewed();
}

// Renderizar los más vistos
function renderMostViewed() {
  let viewed = JSON.parse(localStorage.getItem("mostViewed")) || [];
  mostViewedSlider.innerHTML = "";

  if (viewed.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.classList.add("no-history");
    emptyMessage.textContent = "Aún no hay productos vistos.";
    mostViewedSlider.appendChild(emptyMessage);
    return;
  }

  viewed.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("history-product");
    card.innerHTML = `
      <button class="remove-btn">×</button>
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <div class="history-product-info">
        <h4>${prod.nombre}</h4>
        <p>${prod.categoria}</p>
        <p class="price">${prod.precio} €</p>
        <button class="buy-now-btn">Comprar ahora</button>
      </div>
    `;

    // Eliminar producto individual
    card.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromMostViewed(prod.nombre);
    });

    // Botón comprar
    card.querySelector(".buy-now-btn").addEventListener("click", () => {
      alert(`Has comprado: ${prod.nombre}`);
      // puedes llamar a agregarAlCarrito(prod) si quieres
    });

    mostViewedSlider.appendChild(card);
  });
}

// Eliminar producto individual
function removeFromMostViewed(nombre) {
  let viewed = JSON.parse(localStorage.getItem("mostViewed")) || [];
  viewed = viewed.filter(p => p.nombre !== nombre);
  localStorage.setItem("mostViewed", JSON.stringify(viewed));
  renderMostViewed();
}

// Eliminar todos los más vistos
if (clearViewedBtn) {
  clearViewedBtn.addEventListener("click", () => {
    localStorage.removeItem("mostViewed");
    renderMostViewed();
  });
}

// Flechas del slider
if (viewedPrev && viewedNext) {
  viewedPrev.addEventListener("click", () => {
    mostViewedSlider.scrollBy({ left: -250, behavior: "smooth" });
  });
  viewedNext.addEventListener("click", () => {
    mostViewedSlider.scrollBy({ left: 250, behavior: "smooth" });
  });
}

// Inicializar al cargar
document.addEventListener("DOMContentLoaded", renderMostViewed);


// Conectar con el whatsapp
const whatsapp = document.getElementById("whatsapp-container");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    whatsapp.classList.add("show");
  } else {
    whatsapp.classList.remove("show");
  }
});