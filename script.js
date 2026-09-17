/* ================= YEAR ================= */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* ================= PRELOADER ================= */




/* ================= THEME ================= */

const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light");

  themeBtn.textContent =
    document.body.classList.contains("light")
      ? "☀"
      : "◐";

});


/* ================= MOBILE MENU ================= */

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");

  menuBtn.textContent =
    nav.classList.contains("open")
      ? "×"
      : "☰";
});


document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});


/* ================= TYPING EFFECT ================= */

const typingElement = document.getElementById("typing");

const words = [
  "CSE Aspirant",
  "Aspiring Web Developer",
  "Creative Learner",
  "Future Programmer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

  const current = words[wordIndex];

  if(!deleting){

    typingElement.textContent =
      current.substring(0, charIndex + 1);

    charIndex++;

    if(charIndex === current.length){

      deleting = true;

      setTimeout(typeEffect, 1500);
      return;
    }

  }else{

    typingElement.textContent =
      current.substring(0, charIndex - 1);

    charIndex--;

    if(charIndex === 0){

      deleting = false;
      wordIndex =
        (wordIndex + 1) % words.length;
    }
  }

  setTimeout(
    typeEffect,
    deleting ? 45 : 85
  );
}

typeEffect();


/* ================= SCROLL PROGRESS ================= */

function updateProgress(){

  const scrollTop =
    window.scrollY;

  const height =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    height > 0
      ? (scrollTop / height) * 100
      : 0;

  document.getElementById(
    "scroll-progress"
  ).style.width = progress + "%";
}

window.addEventListener(
  "scroll",
  updateProgress,
  {passive:true}
);


/* ================= REVEAL ================= */

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          entry.target.classList.add("visible");

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold:.12
    }
  );


document.querySelectorAll(".reveal")
  .forEach(element =>
    revealObserver.observe(element)
  );


/* ================= SKILL BARS ================= */

const skillObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          const bar =
            entry.target.querySelector(
              ".skill-bar span"
            );

          if(bar){
            bar.style.width =
              bar.dataset.width;
          }

          skillObserver.unobserve(
            entry.target
          );
        }

      });

    },
    {
      threshold:.35
    }
  );


document.querySelectorAll(".skill")
  .forEach(skill =>
    skillObserver.observe(skill)
  );


/* ================= PARTICLES ================= */

const particleContainer =
  document.getElementById("particles");

for(let i = 0; i < 55; i++){

  const particle =
    document.createElement("span");

  particle.className = "particle";

  particle.style.left =
    Math.random() * 100 + "%";

  particle.style.animationDuration =
    (Math.random() * 15 + 10) + "s";

  particle.style.animationDelay =
    (Math.random() * -20) + "s";

  particle.style.opacity =
    Math.random() * .7;

  const size =
    Math.random() * 3 + 1;

  particle.style.width =
    size + "px";

  particle.style.height =
    size + "px";

  particleContainer.appendChild(
    particle
  );
}


/* ================= CURSOR GLOW ================= */

const cursor =
  document.querySelector(".cursor-glow");

if(
  window.matchMedia(
    "(pointer:fine)"
  ).matches
){

  window.addEventListener(
    "mousemove",
    e => {

      cursor.animate(
        {
          left: e.clientX + "px",
          top: e.clientY + "px"
        },
        {
          duration:350,
          fill:"forwards"
        }
      );

    }
  );

}


/* ================= MAGNETIC BUTTONS ================= */

if(
  window.matchMedia(
    "(pointer:fine)"
  ).matches
){

  document.querySelectorAll(".magnetic")
    .forEach(button => {

      button.addEventListener(
        "mousemove",
        e => {

          const rect =
            button.getBoundingClientRect();

          const x =
            e.clientX -
            rect.left -
            rect.width / 2;

          const y =
            e.clientY -
            rect.top -
            rect.height / 2;

          button.style.transform =
            `translate(${x * .12}px, ${y * .12}px)`;
        }
      );

      button.addEventListener(
        "mouseleave",
        () => {
          button.style.transform = "";
        }
      );

    });

}


/* ================= PROJECT TILT ================= */

if(
  window.matchMedia(
    "(pointer:fine)"
  ).matches
){

  document.querySelectorAll(".project")
    .forEach(card => {

      card.addEventListener(
        "mousemove",
        e => {

          const rect =
            card.getBoundingClientRect();

          const x =
            (e.clientX - rect.left)
            / rect.width;

          const y =
            (e.clientY - rect.top)
            / rect.height;

          const rotateX =
            (0.5 - y) * 4;

          const rotateY =
            (x - 0.5) * 4;

          card.style.transform =
            `translateY(-10px)
             perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;
        }
      );

      card.addEventListener(
        "mouseleave",
        () => {
          card.style.transform = "";
        }
      );

    });

}


/* ================= NO LINK ================= */

function noLink(event){

  event.preventDefault();

  alert(
    "Add your live project URL in index.html."
  );

  return false;
}
