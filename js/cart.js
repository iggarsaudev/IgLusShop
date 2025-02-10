export function updateCartCount(cart) {
    const cartCount = document.getElementById("cartCount")

    // Sumar todas las cantidades de los productos en el carrito
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

    if (totalQuantity > 0) {
        cartCount.textContent = totalQuantity // Mostrar la cantidad total
        cartCount.classList.remove("hidden") // Mostrar el contador si hay productos
    } else {
        cartCount.classList.add("hidden") // Ocultarlo si está vacío
    }
}

export function updateCart(cart) {
    // const cartItemsContainer = document.getElementById('cartItems')
    // const cartContainer = document.getElementById('cartContainer')
    // cartItemsContainer.innerHTML = ''  // Limpiar los productos del carrito

    // // Rellenar los productos
    // cart.forEach(item => {
    //     cartItemsContainer.innerHTML += 
    //         `<div class="cart__item">
    //             <span>${item.title} x ${item.quantity}</span>
    //             <span>${item.price}</span>
    //         </div>`
    // })

    updateCartTotal(cart)

    // Mostrar el carrito
    // cartContainer.classList.add('active')
}

export function updateCartTotal(cart) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    // const cartTotalElement = document.getElementById('cartTotal')
    console.log(total)
    // cartTotalElement.innerText = `Total: $${total.toFixed(2)}`
}