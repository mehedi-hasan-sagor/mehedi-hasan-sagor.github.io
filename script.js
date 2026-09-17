/* =========================================
   YEAR
========================================= */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =========================================
   THEME TOGGLE
========================================= */

const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light");

  const isLight =
    document.body.classList.contains("light");

  themeBtn.textContent =
    isLight ? "☀" : "◐";

});


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {

  const isOpen =
    nav.classList.toggle("mobile-open");

  menuBtn.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );

  menuBtn.textContent =
    isOpen ? "✕" : "☰";

});


/* =========================================
   CLOSE MOBILE MENU
========================================= */

nav.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    nav.classList.remove("mobile-open");

    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );

    menuBtn.textContent = "☰";

  });

});


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if(window.scrollY > 30){
    navbar.classList.add("scrolled");
  }else{
    navbar.classList.remove("scrolled");
  }

}, { passive:true });


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = [

  ...document.querySelectorAll(
    ".section-label"
  ),

  ...document.querySelectorAll(
    ".two-col > div"
  ),

  ...document.querySelectorAll(
    ".skill"
  ),

  ...document.querySelectorAll(
    ".project"
  ),

  ...document.querySelectorAll(
    ".contact-box"
  )

];

revealElements.forEach((element, index) => {

  element.classList.add("reveal");

  if(
    element.classList.contains("skill") ||
    element.classList.contains("project")
  ){

    element.style.transitionDelay =
      `${(index % 4) * 80}ms`;

  }

});


const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          entry.target.classList.add("show");

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold:.12,
      rootMargin:"0px 0px -50px 0px"
    }
  );


revealElements.forEach(element => {
  revealObserver.observe(element);
});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
  document.querySelectorAll("main section");

const navLinks =
  document.querySelectorAll("nav a");


const activeObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          navLinks.forEach(link => {

            link.classList.remove("active");

            if(
              link.getAttribute("href") ===
              "#" + entry.target.id
            ){
              link.classList.add("active");
            }

          });

        }

      });

    },
    {
      threshold:.35
    }
  );


sections.forEach(section => {
  activeObserver.observe(section);
});


/* =========================================
   TYPING EFFECT
========================================= */

const titleElement =
  document.querySelector("#hero-title em");

if(titleElement){

  const originalText =
    titleElement.textContent.trim();

  const phrases = [
    "CSE Aspirant & Web Developer",
    "Future Computer Scientist",
    "Creative Web Builder",
    "Learning • Building • Growing"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  titleElement.textContent = "";

  function typeEffect(){

    const currentPhrase =
      phrases[phraseIndex];

    if(!deleting){

      charIndex++;

      titleElement.textContent =
        currentPhrase.slice(0,charIndex);

      if(charIndex === currentPhrase.length){

        deleting = true;

        setTimeout(
          typeEffect,
          1800
        );

        return;
      }

    }else{

      charIndex--;

      titleElement.textContent =
        currentPhrase.slice(0,charIndex);

      if(charIndex === 0){

        deleting = false;

        phraseIndex =
          (phraseIndex + 1) %
          phrases.length;

      }

    }

    setTimeout(
      typeEffect,
      deleting ? 45 : 75
    );

  }

  setTimeout(
    typeEffect,
    1100
  );

}


/* =========================================
   CUSTOM CURSOR
   DESKTOP ONLY
========================================= */

const canUseCursor =
  window.matchMedia(
    "(pointer:fine)"
  ).matches;

if(canUseCursor){

  const dot =
    document.createElement("div");

  const ring =
    document.createElement("div");

  dot.className = "cursor-dot";
  ring.className = "cursor-ring";

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  dot.style.display = "block";
  ring.style.display = "block";

  let mouseX = 0;
  let mouseY = 0;

  let ringX = 0;
  let ringY = 0;

  window.addEventListener(
    "mousemove",
    event => {

      mouseX = event.clientX;
      mouseY = event.clientY;

      dot.style.left =
        `${mouseX}px`;

      dot.style.top =
        `${mouseY}px`;

    },
    { passive:true }
  );


  function animateCursor(){

    ringX +=
      (mouseX - ringX) * .15;

    ringY +=
      (mouseY - ringY) * .15;

    ring.style.left =
      `${ringX}px`;

    ring.style.top =
      `${ringY}px`;

    requestAnimationFrame(
      animateCursor
    );

  }

  animateCursor();


  document
    .querySelectorAll(
      "a, button, .skill, .project"
    )
    .forEach(element => {

      element.addEventListener(
        "mouseenter",
        () => {
          ring.classList.add("hover");
        }
      );

      element.addEventListener(
        "mouseleave",
        () => {
          ring.classList.remove("hover");
        }
      );

    });

}


/* =========================================
   PROJECT CARD TILT
========================================= */

if(
  window.matchMedia(
    "(pointer:fine)"
  ).matches
){

  document
    .querySelectorAll(
      ".project, .skill"
    )
    .forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateX =
            ((y / rect.height) - .5) * -5;

          const rotateY =
            ((x / rect.width) - .5) * 5;

          card.style.transform =
            `perspective(800px)
             translateY(-8px)
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


/* =========================================
   BUTTON RIPPLE
========================================= */

document
  .querySelectorAll(".btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      function(event){

        const ripple =
          document.createElement("span");

        const rect =
          this.getBoundingClientRect();

        const size =
          Math.max(
            rect.width,
            rect.height
          );

        ripple.style.position =
          "absolute";

        ripple.style.width =
          `${size}px`;

        ripple.style.height =
          `${size}px`;

        ripple.style.left =
          `${event.clientX - rect.left - size/2}px`;

        ripple.style.top =
          `${event.clientY - rect.top - size/2}px`;

        ripple.style.borderRadius =
          "50%";

        ripple.style.background =
          "rgba(124,108,255,.25)";

        ripple.style.transform =
          "scale(0)";

        ripple.style.pointerEvents =
          "none";

        ripple.style.animation =
          "ripple .6s ease-out";

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        },600);

      }
    );

  });


/* =========================================
   RIPPLE ANIMATION
========================================= */

const rippleStyle =
  document.createElement("style");

rippleStyle.textContent = `
@keyframes ripple{
  to{
    transform:scale(2);
    opacity:0;
  }
}
`;

document.head.appendChild(
  rippleStyle
);


/* =========================================
   NO LINK
========================================= */

function noLink(event){

  event.preventDefault();

  alert(
    "Add your live project URL in index.html."
  );

  return false;
}
