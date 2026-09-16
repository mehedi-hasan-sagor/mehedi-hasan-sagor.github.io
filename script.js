document.getElementById("year").textContent = new Date().getFullYear();

const themeBtn = document.querySelector(".theme-btn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeBtn.textContent = document.body.classList.contains("light") ? "☀" : "◐";
});

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.style.display === "flex";
  nav.style.display = open ? "" : "flex";
  nav.style.position = open ? "" : "absolute";
  nav.style.top = "65px";
  nav.style.right = "18px";
  nav.style.flexDirection = "column";
  nav.style.gap = "14px";
  nav.style.padding = "18px";
  nav.style.background = "var(--surface)";
  nav.style.border = "1px solid var(--line)";
  nav.style.borderRadius = "12px";
});

function noLink(event){
  event.preventDefault();
  alert("Add your live project URL in index.html.");
  return false;
}
