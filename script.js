let highestZ = 1;
let voiceStarted = false;
let instrumentalStarted = false;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;
  
  init(paper) {
    // Função comum para tratar movimentos de mouse e toque
    const moveHandler = (clientX, clientY) => {
      // Se o instrumental ainda não foi iniciado, tentamos tocar (precisa de interação)
      if (!instrumentalStarted) {
        const instrumental = document.getElementById('instrumental');
        instrumental.play().catch(error => console.log("Erro ao tocar instrumental:", error));
        instrumentalStarted = true;
      }
      
      // Se ainda não tocou a voz e o papel está sendo movido, inicia sua voz
      if (!voiceStarted && this.holdingPaper) {
        const voice = document.getElementById('voice');
        voice.play().catch(error => console.log("Erro ao tocar a voz:", error));
        voiceStarted = true;
      }
      
      if (!this.rotating) {
        this.mouseX = clientX;
        this.mouseY = clientY;
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }
      
      const dirX = clientX - this.mouseTouchX;
      const dirY = clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const normX = dirX / (dirLength || 1);
      const normY = dirY / (dirLength || 1);
      const angle = Math.atan2(normY, normX);
      let degrees = Math.round((angle * 180) / Math.PI);
      degrees = (360 + degrees) % 360;
      
      if (this.rotating) {
        this.rotation = degrees;
      }
      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = clientX;
        this.prevMouseY = clientY;
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    };

    // Eventos para mouse
    document.addEventListener('mousemove', (e) => {
      moveHandler(e.clientX, e.clientY);
    });
    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.mouseTouchX = e.clientX;
      this.mouseTouchY = e.clientY;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
      if (e.button === 2) {
        this.rotating = true;
      }
    });
    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
    
    // Eventos para touch
    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      moveHandler(touch.clientX, touch.clientY);
      e.preventDefault();
    }, { passive: false });
    
    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      const touch = e.touches[0];
      this.mouseTouchX = touch.clientX;
      this.mouseTouchY = touch.clientY;
      this.prevMouseX = touch.clientX;
      this.prevMouseY = touch.clientY;
    });
    window.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

// Inicializa os papéis
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

// Para desktops, iniciamos o instrumental no primeiro clique em qualquer lugar da página,
// se ele ainda não tiver sido iniciado.
document.addEventListener('mousedown', () => {
  if (!instrumentalStarted) {
    const instrumental = document.getElementById('instrumental');
    instrumental.play().catch(error => console.log("Erro ao tocar instrumental:", error));
    instrumentalStarted = true;
  }
});
