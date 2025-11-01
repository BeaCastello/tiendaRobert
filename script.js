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



// DATOS DE PRODUCTOS

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
  { nombre: "Vestido", categoria: "Ropa", genero: "Mujer", precio: 30, img: "imagenes/vestido.png" },
];


//  VARIABLES GLOBALES

let filtros = { categoria: "all", genero: "all", precio: "relevancia" };
let paginaActual = 1;
const productosPorPagina = 10;

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


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
    });
  });
});

window.addEventListener("click", () => document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("show")));


//  MOSTRAR PRODUCTOS

function mostrarProductos() {
  const cont = document.getElementById("productsContainer");
  cont.innerHTML = "";

  let lista = productos.filter(p =>
    (filtros.categoria === "all" || p.categoria === filtros.categoria) &&
    (filtros.genero === "all" || p.genero === filtros.genero)
  );

  if (filtros.precio === "asc") lista.sort((a, b) => a.precio - b.precio);
  else if (filtros.precio === "desc") lista.sort((a, b) => b.precio - a.precio);

  const inicio = (paginaActual - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const pagina = lista.slice(inicio, fin);

  pagina.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");

    const isFav = favoritos.some(f => f.nombre === p.nombre);
    const heartColor = isFav ? "red" : "gray";
    const heartIcon = isFav ? "fa-heart" : "fa-heart-circle-plus";

    div.innerHTML = `
      <img src="${p.img}" alt="${p.nombre}">
      <h4>${p.nombre}</h4>
      <p><strong>${p.precio} €</strong></p>
      <button class="fav-btn"><i class="fas ${heartIcon}" style="color:${heartColor}; font-size:20px;"></i></button>
      <button class="buy-btn"><img src="imagenes/imgLogo-transparente.png" style="width: 29px; height: 32px; margin-left: -15px; margin-right: 7px;"> Comprar ahora</button>
    `;

    div.querySelector(".fav-btn").addEventListener("click", () => toggleFavorito(p));
    div.querySelector(".buy-btn").addEventListener("click", () => agregarAlCarrito(p));

    cont.appendChild(div);
  });

  document.getElementById("prevBtn").disabled = paginaActual === 1;
  document.getElementById("nextBtn").disabled = fin >= lista.length;
}

//  FAVORITOS

function toggleFavorito(producto) {
  const index = favoritos.findIndex(f => f.nombre === producto.nombre);
  if (index >= 0) favoritos.splice(index, 1);
  else favoritos.push(producto);

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  mostrarProductos();
  mostrarFavoritos();
}

function mostrarFavoritos() {
  const cont = document.getElementById("favoritosContainer");
  cont.innerHTML = "";

  if (favoritos.length === 0) {
    cont.innerHTML = '<p style="text-align:center;">No tienes productos favoritos aún.</p>';
    return;
  }

  favoritos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.img}" alt="${p.nombre}">
      <h4>${p.nombre}</h4>
      <p><strong>${p.precio} €</strong></p>
      <button class="remove-fav-btn"><i class="fas fa-trash" style="color:red;"></i></button>
    `;
    div.querySelector(".remove-fav-btn").addEventListener("click", () => toggleFavorito(p));
    cont.appendChild(div);
  });
}


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
document.getElementById("favorites-btn").addEventListener("click", () => {
  document.getElementById("favoritosSection").scrollIntoView({ behavior: "smooth" });
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
  mostrarFavoritos();
  actualizarCarrito();
});
