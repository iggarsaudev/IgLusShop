import { calculateDiscount,DISCOUNT } from './data.js'

let cart = loadCart() // Cargamos el carrito si lo hubiera

let cartList = document.getElementById("cartList")
let cartTotal = document.getElementById("cartTotal")

let messageCart = document.getElementById("messageCart")

// Solo ejecutamos showProductList si estamos en la página del carrito
if (cartList) {
    showProductList(cart)
    addListenerProducts(cart)

    // Solo mostrar el total si el carrito tiene productos
    if (cart.length > 0) {
        showTotalCart(cart)
    }
}


function showProductList(cart) {
    if (cart.length === 0) {
        messageCart.classList.remove("hidden")
    }
    let salida = ""

    cart.forEach(product => {
        let price = product.price

        if (Number(product.discountPercentage)>DISCOUNT) {
           price =  calculateDiscount(product)           
        }

        salida += `
            <div class="cart__item">
                <img src="${product.images[0]}" class="cart__item-img" alt="${product.title}" aria-label="${product.title}">
                <div class="cart__item-info">
                    <p class="cart__item-title">${product.title}</p>                    
                    <p class="cart__item-quantity">Quantity: <span id="${product.id}Quantity">${product.quantity}</span></p>
                    <p class="cart__item-price">Price: $${price}</p>
                </div>
                <div class="cart__buttons">
                    <button id="${product.id}Remove" class="cart__btn">
                        <span class="material-symbols-outlined">remove</span>
                    </button>
                    <button id="${product.id}Add" class="cart__btn">
                        <span class="material-symbols-outlined">add</span>
                    </button>
                    <button id="${product.id}Delete" class="cart__btn-remove">
                        <span class="material-symbols-outlined">cancel</span>
                    </button>
                </div>
            </div>
        `
    })

    cartList.innerHTML = salida
}

function addListenerProducts(datos) {
    // Asignar eventos a los botones dinámicamente
    datos.forEach(product => {
        document.getElementById(`${product.id}Remove`).addEventListener("click", () => {
            // Listener para eliminar producto
            handleButtonClick(datos, product.id, "remove")
        })

        document.getElementById(`${product.id}Add`).addEventListener("click", () => {
            // Listener para añadir producto
            handleButtonClick(datos, product.id, "add")
        })

        document.getElementById(`${product.id}Delete`).addEventListener("click", () => {
            // Listener para eliminar el producto por completo
            handleButtonClick(datos, product.id, "delete")
        })
    })
}

function handleButtonClick(datos, productId, action) {
    let selectedProduct = datos.find(product => product.id === productId)
    let productInCart = cart.find(item => item.id === productId)

    if (action === "add") {
        if (productInCart) {
            productInCart.quantity += 1
        } else {
            cart.push({ ...selectedProduct, quantity: 1 })
        }
    } else if (action === "remove") {
        if (productInCart && productInCart.quantity > 0) {
            productInCart.quantity -= 1
            if (productInCart.quantity === 0) {
                cart = cart.filter(item => item.id !== productId)  // Eliminar si la cantidad es 0
            }
        }
    } else if (action === "delete") {
        cart = cart.filter(item => item.id !== productId)
    } else if (action === "pay") {
        // Vaciar el carrito y eliminarlo del almacenamiento
        cart = []
        localStorage.removeItem("cart")

        // Eliminar todo el contenido del carrito de la UI
        cartList.innerHTML = ""
        cartTotal.innerHTML = ""

        // Mostrar mensaje de compra realizada
        messageCart.textContent = "Purchase made successfully!"
        messageCart.classList.add("purchaseMade")

        setTimeout(() => {
            // Ocultar mensaje de compra realizada
            messageCart.classList.remove("purchaseMade")
            messageCart.classList.remove("hidden")
            // Mostrar mensaje de carrito vacío
            messageCart.textContent = "Cart empty"
        }, 3000)

        updateCartCount(cart)

        return
    }

    // Actualizar la interfaz si el usuario no ha realizado el pago
    showProductList(cart)
    addListenerProducts(cart)
    updateCart(cart)
    updateCartCount(cart)

    // Solo mostrar el total si el carrito tiene productos
    if (cart.length > 0) {
        showTotalCart(cart)
    } else {
        cartTotal.innerHTML = ""
    }
}

function showTotalCart(cart) {
    messageCart.classList.add("hidden")

    updateCartCount(cart)
    let [subtotal, costs, total] = updateCartTotal(cart)

    let salida = ""

    salida += `
        <div class="cart__price">
            <div class="cart__subtotal-info">
                <p class="cart__subtotal-price">Subtotal: <span id="subtotal">$${subtotal}</span></p>
                <p class="cart__subtotal-costs">Shipping Costs: <span id="costs">$${costs}</span></p>
            </div>
            <div class="cart__total-divider"></div>
            <div class="cart__total">
                <p class="cart__total-price">Total: <span id="total">$${total}</span></p>
            </div>
            <button id="cartPay" class="cart__btn-pay">Pay</button>
        </div>
    `

    cartTotal.innerHTML = salida

    let payButton = document.getElementById("cartPay")
    if (payButton) {
        payButton.addEventListener("click", () => {
            handleButtonClick(cart, null, "pay")
        })
    }
}

export function updateCartCount(cart) {
    let cartCount = document.getElementById("cartCount")

    // Sumar todas las cantidades de los productos en el carrito
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

    if (totalQuantity > 0) {
        cartCount.textContent = totalQuantity // Mostrar la cantidad total
        cartCount.classList.remove("hidden") // Mostrar el contador si hay productos
    } else {
        cartCount.classList.add("hidden") // Ocultarlo si está vacío
    }
}

export function updateCart(cart) {
    const filteredCart = cart.map(({ id, title, images, price, quantity, discountPercentage }) => ({
        id,
        title,
        images,
        price,
        quantity,
        discountPercentage
    }));

    localStorage.setItem("cart", JSON.stringify(filteredCart)) // Guardar en localStorage
    updateCartTotal(filteredCart)
}

function calculateSubtotal(sum, item) {
    let price = item.price
    if (Number(item.discountPercentage)>DISCOUNT) {
       price =  calculateDiscount(item)           
    }
    return sum + price * item.quantity
}
export function updateCartTotal(cart) {
    // Calcular el subtotal
    let subtotal = cart.reduce((sum, item) => calculateSubtotal(sum, item), 0)
    subtotal = parseFloat(subtotal.toFixed(2))

    let costs = 4.99

    // Si el subtotal es menor a $100, mostrar los costos
    if (subtotal >= 100) {
        costs = "FREE"
    }

    // Mostrar el total final
    let total = subtotal + (subtotal < 100 ? costs : 0) // Si el subtotal es menos de 100, agregamos los costos de envío
    total = parseFloat(total.toFixed(2))

    return [subtotal, costs, total]
}

export function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    let storedCart = localStorage.getItem("cart")
    // console.log(JSON.parse(storedCart))
    if (storedCart) {
        cart = JSON.parse(storedCart)
        updateCart(cart)
        updateCartCount(cart)
    }
    return cart
}