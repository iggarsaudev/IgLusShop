let cart = loadCart() // Cargamos el carrito si lo hubiera

let productsList = document.getElementById("productsList")
let priceTotal = document.getElementById("priceTotal")

// Solo ejecutamos showProductList si estamos en la página del carrito
if (productsList) {
    showProductList(cart);
}

export function showProductList(cart) {
    let salida = ""

    cart.forEach(product => {
        salida += `
            <div>
                <img src="${product.images[0]}" class="list_img">
                <p>${product.title}</p>
            </div>
        `
    });

    productsList.innerHTML = salida
}

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
    console.log(cart)
    localStorage.setItem("cart", JSON.stringify(cart)); // Guardar en localStorage
    updateCartTotal(cart)
}

export function updateCartTotal(cart) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    console.log(total)
}

export function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    const storedCart = localStorage.getItem("cart");
    console.log(JSON.parse(storedCart))
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart(cart);
        updateCartCount(cart);
    }
    return cart
}