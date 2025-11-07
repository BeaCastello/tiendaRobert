
  const cart = [
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
  

    const tbody = cart.map(item => `
    <tr>
      <td>${item.nombre}</td>
      <td>${item.precio.toFixed(2)} €</td>
      <td>${item.cantidad}</td>
      <td>${(item.precio * item.cantidad).toFixed(2)} €</td>
    </tr>
  `).join("");

  document.getElementById("cart-table").innerHTML =
    "<tr><th>Producto</th><th>Precio</th><th>Cant.</th><th>Total</th></tr>" + tbody;

  // --- Calcular total ---
  const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  document.getElementById("total").innerText = total.toFixed(2);

  // --- PayPal Buttons ---
  paypal.Buttons({
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            currency_code: "EUR",
            value: total.toFixed(2),
            breakdown: {
              item_total: { currency_code: "EUR", value: total.toFixed(2) }
            }
          },
          items: cart.map(item => ({
            name: item.nombre,
            unit_amount: { currency_code: "EUR", value: item.precio.toFixed(2) },
            cantidad: item.cantidad.toString(),
            category: "PHYSICAL_GOODS"
          }))
        }],
        application_context: { shipping_preference: 'NO_SHIPPING' }
      });
    },

    onApprove: async (data, actions) => {
      const details = await actions.order.capture();
      document.getElementById("result").innerText = "✅ Pago exitoso:\n" + JSON.stringify(details, null, 2);
      alert("Pago completado. Gracias " + details.payer.name.given_name + "!");
    },

    onCancel: () => {
      document.getElementById("result").innerText = "⚠️ El usuario canceló el pago.";
    },

    onError: err => {
      document.getElementById("result").innerText = "❌ Error: " + err;
    }
  }).render("#paypal-button-container");
