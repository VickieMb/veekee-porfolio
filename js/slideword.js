class SlideWordAnimation {
    constructor(slideword) {
      this.slideword = slideword;
      this.originalContent = Array.from(this.slideword.children).map((child) => child.cloneNode(true));
  
      /*
              Paramètres optionnels
              */
      // Durée d'un scroll complet
      this.speed = this.slideword.getAttribute("data-speed");
      this.speed = this.speed === null ? 0.05 : parseFloat(this.speed); // pixels par seconde
      // Sens de l'animation (1/-1)
      this.direction = this.slideword.getAttribute("data-direction");
      this.direction = this.direction === null ? 1 : parseInt(this.direction);
      this.init();
    }
    init() {
      /*
          On remplit le bloc en répétant les children si nécessaire
          */
      this.initialWidth = this.slideword.scrollWidth;
      // console.log("initialWidth : " + this.initialWidth);
      if (this.slideword.scrollWidth > 0) {
        const duplicationsNeededToFillScreen = Math.ceil(window.innerWidth / this.slideword.scrollWidth);
        const childrenCopies = [];
        for (let i = 0; i < duplicationsNeededToFillScreen; i++) {
          this.originalContent.forEach((child) => {
            childrenCopies.push(child.cloneNode(true));
          });
        }
        this.slideword.append(...childrenCopies);
      }
  
      /*
          Calcul de l'animation
          */
      // La valeur des abscisses de gridGap
      const gapValue = 10;
      // console.log("gapValue : " + gapValue);
      this.widthToScroll = this.initialWidth + gapValue;
      // console.log("widthToScroll : " + this.widthToScroll);
      const duration = this.widthToScroll / this.speed / 2;
      // console.log("duration : " + duration);
  
      this.keyframes = [];
      if (this.direction > 1) {
        this.keyframes = [{ transform: `translate3d(-${this.widthToScroll}px, 0, 0)` }, { transform: "translate3d(0, 0, 0)" }];
      } else {
        this.keyframes = [{ transform: "translate3d(0, 0, 0)" }, { transform: `translate3d(-${this.widthToScroll}px, 0, 0)` }];
      }
  
      this.animation = this.slideword.animate(this.keyframes, {
        duration: duration,
        iterations: Infinity,
        easing: "linear",
        fill: "forwards",
      });
    }
  }
  
  export default SlideWordAnimation;