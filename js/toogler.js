// menuToggler
const menuToggler = document.getElementById("menuToggler");
const nav = document.getElementById("nav");

menuToggler.addEventListener("click", () => { // Alterna iconos
    nav.classList.toggle("header__nav--active"); // toggle -> si está la clase la elimina, si no está la añade
    menuToggler.classList.toggle("header__toggler--active");
});
// End menuToggler