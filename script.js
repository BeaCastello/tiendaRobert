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


// LISTA 
const productos = [
  { nombre: "Camiseta básica", categoria: "Ropa", genero: "Hombre", precio: 20, img: "imagenes/camisetas.png" },
  { nombre: "Zapatillas deportivas", categoria: "Calzado", genero: "Mujer", precio: 60, img: "imagenes/zapatillas.png" },
  { nombre: "Auriculares Bluetooth", categoria: "Electrónica", genero: "Todos", precio: 45, img: "imagenes/auriculares.png" },
  { nombre: "Pantalón vaquero", categoria: "Ropa", genero: "Hombre", precio: 40, img: "imagenes/pantalon.png" },
  { nombre: "Bolso de cuero", categoria: "Hogar", genero: "Mujer", precio: 90, img: "imagenes/bolso_cuero.png" },
  { nombre: "Sudadera oversize", categoria: "Ropa", genero: "Mujer", precio: 35, img: "imagenes/sudadera.png" },
  { nombre: "Reloj inteligente", categoria: "Electrónica", genero: "Todos", precio: 120, img: "imagenes/relojes.png" },
  { nombre: "Zapatos de vestir", categoria: "Calzado", genero: "Hombre", precio: 70, img: "imagenes/calzado_vestir.png" },
  { nombre: "Auriculares Pro", categoria: "Electrónica", genero: "Todos", precio: 180, img: "imagenes/auricularespro.png" },
  { nombre: "Chaqueta impermeable", categoria: "Ropa", genero: "Hombre", precio: 55, img: "imagenes/chaqueta_impermiable.png" },
  { nombre: "Sandalias verano", categoria: "Calzado", genero: "Mujer", precio: 30, img: "imagenes/sandalia_verano.png" },
  { nombre: "Silla", categoria: "Hogar", genero: "Todos", precio: 110, img: "imagenes/silla1.png" },
  { nombre: "Laptop", categoria: "Electrónica", genero: "Todos", precio: 180, img: "imagenes/laptop.png" },
  { nombre: "Smartphone", categoria: "Electrónica", genero: "Todos", precio: 55, img: "imagenes/smartphone.png" },
];

//  VARIABLES GLOBALES
let filtros = { categoria: "all", genero: "all", precio: "relevancia" };
let paginaActual = 1;
const productosPorPagina = 10;
let terminoBusqueda = "";


/* --- FILTROS (igual que antes) --- */
document.querySelectorAll('.dropdown').forEach(drop => {
  const button = drop.querySelector('.dropbtn');
  const menu = drop.querySelector('.dropdown-content');
  const tipo = drop.dataset.filter;

  button.addEventListener('click', e => {
    e.stopPropagation();
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('show'));
    drop.classList.toggle('show');
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      filtros[tipo] = a.dataset.value;
      button.textContent = `${a.textContent} ▾`;
      drop.classList.remove('show');
    });
  });
});

window.addEventListener('click', () => document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('show')));

/* --- Mostrar productos--- */
function mostrarProductos() {
  const cont = document.getElementById('productsContainer');
  cont.innerHTML = '';

  let lista = productos.filter(p => 
    (filtros.categoria === 'all' || p.categoria === filtros.categoria) &&
    (filtros.genero === 'all' || p.genero === filtros.genero)
  );

  if (filtros.precio === 'asc') lista.sort((a,b)=>a.precio-b.precio);
  else if (filtros.precio === 'desc') lista.sort((a,b)=>b.precio-a.precio);
  

  const inicio = (paginaActual - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const pagina = lista.slice(inicio, fin);

  pagina.forEach((p, index) => {
    const div = document.createElement('div');
    div.classList.add('product');
   
    const prodId = productos.indexOf(p); 
    div.innerHTML = `
      <img src="${p.img}" alt="${p.nombre}">
      <h4>${p.nombre}</h4>
      <p>${p.categoria} · ${p.genero}</p>
      <p class="price"><strong>${p.precio} €</strong></p>
      <button class="add-btn" data-id="${prodId}">Añadir al carrito</button>
    `;
    cont.appendChild(div);
  });

  document.getElementById('prevBtn').disabled = paginaActual === 1;
  document.getElementById('nextBtn').disabled = fin >= lista.length;

  // Delegación: escuchar clicks en botones "Añadir"
  cont.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      addToCartById(id);
    });
  });
}

/* --- Botones de paginación y aplicar filtros --- */
document.getElementById('applyFilters').addEventListener('click', () => {
  paginaActual = 1;
  mostrarProductos();
});

document.getElementById('prevBtn').addEventListener('click', () => {
  if (paginaActual > 1) {
    paginaActual--;
    mostrarProductos();
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  paginaActual++;
  mostrarProductos();
});

/* ---BOTONES DE PAGINACIÓN--- */
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

//  BUSCADOR DE PRODUCTOS 
const searchInput = document.getElementById("searchInput");
const searchIcon = document.getElementById("searchIcon");
const productsContainer = document.getElementById("productsContainer");

let historialProductos = JSON.parse(localStorage.getItem("historialProductos")) || [];

// Guardar un producto individual en el historial
function guardarProductoHistorial(producto) {
  if (!producto || !producto.nombre) return;

  // Evitar duplicados por nombre
  const existe = historialProductos.some(p => p.nombre === producto.nombre);
  if (!existe) {
    historialProductos.unshift(producto); // Agregar al inicio
  }

  // Limita el historial a 12 productos
  if (historialProductos.length > 12) historialProductos = historialProductos.slice(0, 12);

  // Guarda en localStorage y actualizar vista
  localStorage.setItem("historialProductos", JSON.stringify(historialProductos));
  mostrarHistorialProductos();
}
 
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

  // Elimina producto individualmente
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation(); // evita que se dispare el click del div
      const index = e.target.dataset.index;
      historialProductos.splice(index, 1);
      localStorage.setItem("historialProductos", JSON.stringify(historialProductos));
      mostrarHistorialProductos(); // refrescar el slider
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
 const whatsapp = document.getElementById("whatsapp-container");

window.addEventListener("scroll", () => {
if (window.scrollY > 300) {
  whatsapp.classList.add("show");
 } else
     {    whatsapp.classList.remove("show");
 }
      })

      // ======= CARRITO =======
let cart = JSON.parse(localStorage.getItem('cart') || '[]'); // [{id, qty}]
const cartBtn       = document.getElementById('cart-btn');
const cartCount     = document.getElementById('cart-count');
const cartPanel     = document.getElementById('cart-panel');
const cartOverlay   = document.getElementById('cart-overlay');
const cartClose     = document.getElementById('cart-close');
const cartItemsEl   = document.getElementById('cart-items');
const cartTotalEl   = document.getElementById('cart-total');
const cartClearBtn  = document.getElementById('cart-clear');
const cartCheckout  = document.getElementById('cart-checkout');

function saveCart(){ localStorage.setItem('cart', JSON.stringify(cart)); }
function findCartIndexById(id){ return cart.findIndex(i => i.id === id); }

function addToCartById(id, qty=1){
  const prod = productos[id];
  if(!prod) return;
  const i = findCartIndexById(id);
  if(i>-1) cart[i].qty += qty;
  else cart.push({id, qty});
  saveCart();
  updateCartBadge();
  renderCart();
  openCart();
}

// Soporta botones que pasan nombre en vez de id
function addToCartByName(nombre, qty=1){
  const idx = productos.findIndex(p => p.nombre === nombre);
  if(idx>-1) addToCartById(idx, qty);
}

function changeQty(id, delta){
  const i = findCartIndexById(id);
  if(i===-1) return;
  cart[i].qty += delta;
  if(cart[i].qty <= 0) cart.splice(i,1);
  saveCart(); updateCartBadge(); renderCart();
}
function setQty(id, value){
  const n = Math.max(1, parseInt(value||'1',10));
  const i = findCartIndexById(id);
  if(i===-1) return;
  cart[i].qty = n;
  saveCart(); updateCartBadge(); renderCart();
}
function removeFromCart(id){
  cart = cart.filter(it => it.id !== id);
  saveCart(); updateCartBadge(); renderCart();
}
function clearCart(){
  cart = []; saveCart(); updateCartBadge(); renderCart();
}

function formatEUR(n){ return n.toFixed(2).replace('.', ',') + ' €'; }

function calcTotal(){
  return cart.reduce((acc, it) => acc + (productos[it.id].precio * it.qty), 0);
}

function updateCartBadge(){
  const count = cart.reduce((acc, it)=>acc+it.qty, 0);
  if(cartCount) cartCount.textContent = count;
}

function renderCart(){
  cartItemsEl.innerHTML = '';
  if(cart.length===0){
    cartItemsEl.innerHTML = `<p style="padding:14px; color:#666;">Tu carrito está vacío.</p>`;
  }else{
    cart.forEach(item=>{
      const p = productos[item.id];
      const li = document.createElement('div');
      li.className = 'cart-item';
      li.innerHTML = `
        <img src="${p.img}" alt="${p.nombre}">
        <div>
          <h4>${p.nombre}</h4>
          <div class="price">${formatEUR(p.precio)}</div>
          <div class="qty" data-id="${item.id}">
            <button class="qty-dec" aria-label="Restar">−</button>
            <input class="qty-input" type="number" min="1" value="${item.qty}">
            <button class="qty-inc" aria-label="Sumar">+</button>
            <button class="rm-btn" title="Eliminar">Eliminar</button>
          </div>
        </div>
        <div class="line-total">${formatEUR(p.precio * item.qty)}</div>
      `;
      cartItemsEl.appendChild(li);
    });
  }
  cartTotalEl.textContent = formatEUR(calcTotal());
}

// Abrir/cerrar panel
function openCart(){ cartPanel.classList.add('show'); cartOverlay.classList.add('show'); }
function closeCart(){ cartPanel.classList.remove('show'); cartOverlay.classList.remove('show'); }

cartBtn && cartBtn.addEventListener('click', openCart);
cartClose && cartClose.addEventListener('click', closeCart);
cartOverlay && cartOverlay.addEventListener('click', closeCart);

// Delegación de eventos dentro del carrito
cartItemsEl.addEventListener('click', (e)=>{
  const wrap = e.target.closest('.qty');
  if(!wrap) return;
  const id = parseInt(wrap.dataset.id,10);
  if(e.target.classList.contains('qty-dec')) changeQty(id, -1);
  if(e.target.classList.contains('qty-inc')) changeQty(id, +1);
  if(e.target.classList.contains('rm-btn'))  removeFromCart(id);
});
cartItemsEl.addEventListener('change', (e)=>{
  if(e.target.classList.contains('qty-input')){
    const wrap = e.target.closest('.qty');
    const id = parseInt(wrap.dataset.id,10);
    setQty(id, e.target.value);
  }
});

cartClearBtn && cartClearBtn.addEventListener('click', ()=>{
  if(confirm('¿Vaciar el carrito?')) clearCart();
});

cartCheckout && cartCheckout.addEventListener('click', ()=>{
  if(cart.length===0){ alert('Tu carrito está vacío.'); return; }
  // Aquí puedes redirigir a tu checkout/pasarela o generar un resumen:
  const resumen = cart.map(it=>{
    const p = productos[it.id];
    return `${p.nombre} x ${it.qty} = ${formatEUR(p.precio*it.qty)}`;
  }).join('\n');
  alert(`Resumen de compra:\n\n${resumen}\n\nTotal: ${formatEUR(calcTotal())}`);
});

// ======= Ganchos para los botones existentes =======
// 1) Botones .add-btn (tus cards con data-id)
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.add-btn');
  if(!btn) return;
  const id = parseInt(btn.dataset.id,10);
  addToCartById(id, 1);
});

// 2) Botones "Comprar ahora" .buy-btn (pueden venir con data-id o data-nombre)
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.buy-btn');
  if(!btn) return;
  const id = btn.dataset.id ? parseInt(btn.dataset.id,10) : null;
  const nombre = btn.dataset.nombre;
  if(id!=null) addToCartById(id, 1);
  else if(nombre) addToCartByName(nombre, 1);
  else{
    // Si no hay dataset, intenta inferir por el <h4> más cercano
    const card = btn.closest('.product');
    const title = card ? card.querySelector('h4')?.textContent?.trim() : null;
    if(title) addToCartByName(title, 1);
  }
});

// 3) Botones del slider historial .buy-btn-small (usan data-nombre)
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.buy-btn-small');
  if(!btn) return;
  const nombre = btn.dataset.nombre;
  if(nombre) addToCartByName(nombre, 1);
});

// ======= Inicialización al cargar =======
document.addEventListener('DOMContentLoaded', ()=>{
  updateCartBadge();
  renderCart();
});