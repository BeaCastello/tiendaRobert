document.addEventListener('click', () => {
    localStorage.setItem('filtros', JSON.stringify(filtros));
  localStorage.setItem('paginaActual', 1);  
  window.location.href = 'index.html';
});
