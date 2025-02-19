export function addListenerProducts(datos, updateCart, updateCartCount, cart) {
    // Asignar eventos a los botones dinámicamente
    datos.forEach(product => {
        document.getElementById(`${product.id}Remove`).addEventListener("click", () => {
            // Listener para eliminar producto
            handleButtonClick(datos, product.id, "remove", updateCart, updateCartCount, cart)
        })
        document.getElementById(`${product.id}Add`).addEventListener("click", () => {
            // Listener para añadir producto
            handleButtonClick(datos, product.id, "add", updateCart, updateCartCount, cart)
        })
    })
}

export function handleButtonClick(datos, productId, action, updateCart, updateCartCount, cart) {
    // console.log(datos, productId, action)
    let selectedProduct = datos.find(product => product.id === productId)
    // console.log(selectedProduct, action)
    let productInCart = cart.find(item => item.id === productId)

    if (action === "add") {
        if (productInCart) {
            productInCart.quantity += 1
        } else {
            cart.push({ ...selectedProduct, quantity: 1 })
        }
        document.getElementById(`${productId}Remove`).classList.remove("disabled") // Se habilita el botón en cuanto aparece en el carrito
    } else if (action === "remove") {
        if (productInCart && productInCart.quantity > 0) {
            productInCart.quantity -= 1
            if (productInCart.quantity === 0) {
                cart = cart.filter(item => item.id !== productId)  // Eliminar si la cantidad es 0
                document.getElementById(`${productId}Remove`).classList.add("disabled") // Si la cantidad es 0 se deshabilita el botón
            }
        }
    }
    // console.log(cart)
    updateCart(cart)
    updateCartCount(cart)
}

