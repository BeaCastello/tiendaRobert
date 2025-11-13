    // Recuperar carrito y total
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const productos = JSON.parse(localStorage.getItem('productos') || '[]');
    const total = parseFloat(localStorage.getItem('cartTotal') || 0);

    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');

    // Mostrar carrito
    function renderCheckoutCart() {
      if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
      }
      cartItemsEl.innerHTML = '';
      cart.forEach(item => {
        const prod = productos[item.id];
        if (!prod) return;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${prod.img}" alt="${prod.nombre}">
          <div class="info">
            <div><strong>${prod.nombre}</strong></div>
            <div>${item.qty} × ${prod.precio.toFixed(2)} €</div>
          </div>
          <div><strong>${(prod.precio * item.qty).toFixed(2)} €</strong></div>
        `;
        cartItemsEl.appendChild(div);
      });
      cartTotalEl.textContent = total.toFixed(2).replace('.', ',') + ' €';
    }

    renderCheckoutCart();

    // Formulario de confirmación
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const direccion = document.getElementById('direccion').value.trim();
      const pago = document.getElementById('pago').value;

      if (!nombre || !email || !direccion || !pago) {
        alert('Por favor, completa todos los campos.');
        return;
      }

     alert(`¡Gracias por tu compra, ${nombre}!\nTe enviaremos la confirmación a ${email}.`);

      // Limpiar carrito y redirigir
      localStorage.removeItem('cart');
      localStorage.removeItem('cartTotal');
      window.location.href = 'index.html';
    });