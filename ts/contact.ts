type Message = {
    name: string,
    email: string,
    message: string
}

let form = document.getElementById("contactForm") as HTMLFormElement
let formMessage = document.getElementById("formMessage") as HTMLParagraphElement
let formError = document.getElementById("formError") as HTMLParagraphElement

form.addEventListener("submit", (event) => {
    event.preventDefault()

    let messageData: Message = {
        name: (document.getElementById("name") as HTMLInputElement).value.trim(),
        email: (document.getElementById("email") as HTMLInputElement).value.trim(),
        message: (document.getElementById("message") as HTMLTextAreaElement).value.trim()
    }

    if (validateForm(messageData)) {
        formMessage.textContent = "Mensaje enviado correctamente."
        formError.classList.add("hidden")
        formMessage.classList.remove("hidden")

        setTimeout(() => {
            formMessage.classList.add("hidden")
        }, 3000)
    } else {
        formError.textContent = "Por favor, completa todos los campos."
        formError.classList.remove("hidden")
    }
    
    form.reset()    
})

function validateForm(message: Message): boolean {
    return (message.name !== "" && message.email !== "" && message.message !== "")
}