document.addEventListener("DOMContentLoaded", function(){
  const pages = document.querySelectorAll(".paper");
  let currentPage = 0;
  
  // Exibe a primeira folha ao carregar
  pages[currentPage].style.display = "block";
  
  const nextButton = document.getElementById("nextButton");
  
  nextButton.addEventListener("click", function(){
    // Esconde a folha atual
    pages[currentPage].style.display = "none";
    
    // Incrementa o índice
    currentPage++;
    
    // Se chegar ao final, pode voltar ao início ou desabilitar o botão
    if (currentPage >= pages.length) {
      currentPage = 0; // Loop: volta para a primeira folha
      // Ou descomente a linha abaixo para desabilitar o botão no final:
      // nextButton.disabled = true;
    }
    
    // Exibe a nova folha
    pages[currentPage].style.display = "block";
  });
});
