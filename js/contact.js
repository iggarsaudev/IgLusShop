"use strict";
let form = document.getElementById("contactForm");
let formMessage = document.getElementById("formMessage");
let formError = document.getElementById("formError");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let messageData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim()
    };
    if (validateForm(messageData)) {
        formMessage.textContent = "Mensaje enviado correctamente.";
        formError.classList.add("hidden");
        formMessage.classList.remove("hidden");
        setTimeout(() => {
            formMessage.classList.add("hidden");
        }, 3000);
    }
    else {
        formError.textContent = "Por favor, completa todos los campos.";
        formError.classList.remove("hidden");
    }
    form.reset();
});
function validateForm(message) {
    return (message.name !== "" && message.email !== "" && message.message !== "");
}
