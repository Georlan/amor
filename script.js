let highestZ = 1;

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
    const moveHandler = (clientX, clientY) => {
      this.mouseX = clientX;
      this.mouseY = clientY;
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;
      
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

    // Eventos de mouse
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
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
