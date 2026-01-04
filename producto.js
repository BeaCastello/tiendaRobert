//  VARIABLES GLOBALES
let filtros = { categoria: "all", genero: "all", precio: "relevancia" };


document.addEventListener('click', () => {
    localStorage.setItem('filtros', JSON.stringify(filtros));
  localStorage.setItem('paginaActual', 1);  
  window.location.href = 'index.html';
});
