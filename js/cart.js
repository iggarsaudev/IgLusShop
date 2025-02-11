export function updateCartCount(cart) {
    console.log(cart)
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