// Array productos (el mismo que en index)
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


// 1. Leer ID desde la URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"), 10);

// 2. Validar
if (isNaN(id) || !productos[id]) {
  document.body.innerHTML = "<h2>Producto no encontrado</h2>";
  throw new Error("Producto inválido");
}

const producto = productos[id];

// 3. Pintar datos
document.getElementById("prod-img").src = producto.img;
document.getElementById("prod-name").textContent = producto.nombre;
document.getElementById("prod-category").textContent = producto.categoria;
document.getElementById("prod-gender").textContent = producto.genero;
document.getElementById("prod-price").textContent = producto.precio + " €";

// 4. Comprar ahora
document.getElementById("buyNow").addEventListener("click", () => {
  addToCartById(id, 1); // usa el mismo carrito
});








document.addEventListener('click', () => {
    localStorage.setItem('filtros', JSON.stringify(filtros));
  localStorage.setItem('paginaActual', 1);  
  window.location.href = 'index.html';
});

 
