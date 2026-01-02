const productos = [
  {
    nombre: "Camiseta básica",
    precio: 20,
    img: "imagenes/camisetas.png",
    galeria: [
      "imagenes/camisetas.png",
      "imagenes/camisetas2.png",
      "imagenes/camisetas3.png"
    ]
  },
  {
    nombre: "Zapatillas deportivas",
    precio: 60,
    img: "imagenes/zapatillas.png",
    galeria: [
      "imagenes/zapatillas.png",
      "imagenes/zapatillas2.png"
    ]
  }
];

// Obtener el nombre desde la URL
const params = new URLSearchParams(window.location.search);
const nombreProducto = params.get("nombre");

// Buscar producto
const producto = productos.find(p => p.nombre === nombreProducto);

if (producto) {
  document.getElementById("productName").textContent = producto.nombre;
  document.getElementById("productPrice").textContent = producto.precio + " €";

  const mainImage = document.getElementById("mainImage");
  mainImage.src = producto.img;

  const gallery = document.getElementById("gallery");

  producto.galeria.forEach(img => {
    const thumb = document.createElement("img");
    thumb.src = img;

    thumb.addEventListener("click", () => {
      mainImage.src = img;
    });

    gallery.appendChild(thumb);
  });
}



