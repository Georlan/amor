document.addEventListener("DOMContentLoaded", function(){
  const pages = document.querySelectorAll(".paper");
  let currentPage = 0;
  const totalPages = pages.length;
  const intervalTime = 5000; // tempo em milissegundos (5 segundos)

  // Exibe a primeira folha ao carregar
  pages[currentPage].style.display = "block";
  
  // Função para alternar páginas
  function nextPage() {
    // Oculta a página atual
    pages[currentPage].style.display = "none";
    
    // Incrementa o índice
    currentPage = (currentPage + 1) % totalPages;
    
    // Exibe a nova página
    pages[currentPage].style.display = "block";
  }
  
  // Chama a função nextPage a cada intervalo definido
  setInterval(nextPage, intervalTime);
});
