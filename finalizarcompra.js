// Leer carrito desde localStorage
        const cart = JSON.parse(localStorage.getItem("carrito")) || [];

        function loadOrderSummary() {
            const summary = document.getElementById("orderSummary");
            const totalElement = document.getElementById("orderTotal");
            summary.innerHTML = "";

            let total = 0;

            cart.forEach(item => {
                total += item.precio;
                summary.innerHTML += `
        <div class="order-summary-item">
          <span>${item.nombre}</span>
          <strong>${item.precio} €</strong>
        </div>
      `;
            });

            totalElement.textContent = total.toFixed(2) + " €";
        }

        loadOrderSummary();

        // Confirmar pedido
        document.getElementById("confirmOrder").addEventListener("click", () => {
            alert("✅ ¡Gracias por tu compra! Tu pedido ha sido procesado correctamente.");
            localStorage.removeItem("carrito"); // vaciar carrito
            window.location.href = "index.html"; // volver a la tienda
        });












        


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


