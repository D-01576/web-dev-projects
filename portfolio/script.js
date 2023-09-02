let clickk = document.querySelector(".color")

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


document.addEventListener("scroll",()=>{
  // console.log(window.innerHeight)
  let reveals = document.querySelectorAll(".reveal");
  for(let i = 0;i < reveals.length;i++){
    let top = reveals[i].getBoundingClientRect().top
    if(top < 650){
      reveals[i].classList.add('active');
    }
    else{
      reveals[i].classList.remove('active');
    }
  }
})

window.addEventListener("load",()=>{
  let container = document.querySelector(".container");
  let container2 =  document.querySelector(".container2");

  container.classList.add('active');
  container2.classList.add('active');
})

function colorchange(){
  let start = document.querySelector(".start").getBoundingClientRect().top;
  let about = document.querySelector(".start").getBoundingClientRect().top;
  let work = document.querySelector(".start").getBoundingClientRect().top;
  let contact = document.querySelector(".start").getBoundingClientRect().top;
  let color = document.querySelectorAll(".color")
  console.log(about)
  console.log(window.windowheight)

    if(start > -677.2388305664062 && start <= 0){
      color[0].classList.add('active')
      color[1].classList.remove('active')
      color[2].classList.remove('active')
      color[3].classList.remove('active')
    }
    else if(start > -1000.858154296875){
      color[0].classList.remove('active')
      color[1].classList.add('active')
      color[2].classList.remove('active')
      color[3].classList.remove('active')
    }
    else if(start > -2194.02978515625){
      color[0].classList.remove('active')
      color[1].classList.remove('active')
      color[2].classList.add('active')
      color[3].classList.remove('active')
    }
    else{
      color[0].classList.remove('active')
      color[1].classList.remove('active')
      color[2].classList.remove('active')
      color[3].classList.add('active')
    }
}

document.addEventListener("scroll",colorchange)
clickk.addEventListener("click",colorchange)

var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');

document.addEventListener('mousemove', function(e){
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function(){
  cursor.classList.add('click');
  cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function(){
  cursor.classList.remove('click')
  cursorinner.classList.remove('cursorinnerhover')
});

let button = document.querySelector("#touch")
let cancel = document.getElementById("cancel")
let form = document.querySelector(".form");

button.addEventListener("click",()=>{
  form.style.left = "0";
  if(window.screen.width > 858){
  cursor.style.display = "none";
  cursorinner.style.display = "none";
  document.querySelector("body").style.cursor = "auto"
  }
})

cancel.addEventListener("click",()=>{
  form.style.left = "-100%";
  if(window.screen.width > 858){
  cursor.style.display = "flex";
  cursorinner.style.display = "flex";
  document.querySelector("body").style.cursor = "none"
  }
})