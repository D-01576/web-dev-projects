let dot = document.querySelector(".dot")
let circle = document.querySelector(".circle")

const positionElement = (e)=> {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
  
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    move();
  }
  
  window.addEventListener('mousemove', positionElement)

  function move(){
    const a = dot.style.transform;
    // const b = dot;
    // console.log(a)
    circle.style.transform = `${a}`;
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


