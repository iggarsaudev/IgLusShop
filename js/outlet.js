import { CATEGORIES,calculateDiscount,DISCOUNT } from './data.js'
import { updateCart, updateCartCount, loadCart } from './cart.js'


fillSelectCategory()
let cart = loadCart()

function handleButtonClick(datos, productId, action) {
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
    })
}
function fillSelectCategory() {
    CATEGORIES.forEach(category => {
        handleCategoryViewerOutlet(category.slug)
    })

}

function fillProductsViewerOutlet(datos)  {
    let divProductsViewer = document.getElementById("productsViewer")
    let salida = ""
    datos.forEach(product => {
        console.log(product)
        let imagenes = product.images || []
        let id = `carousel-${product.id}` // Un id único para el carrusel de cada producto

        salida += `
            <div class="card">
                <div id="${id}" class="carousel slide product-carousel" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${imagenes.map((img, index) =>
            `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img src="${img}" class="carousel__img d-block w-100" alt="${product.title}" aria-label="${product.title}">
                            </div>`
        ).join("")}
                    </div>
                    ${imagenes.length > 1 ? `
                    <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
                        <span class="material-symbols-outlined">arrow_left</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
                        <span class="material-symbols-outlined">arrow_right</span>
                    </button>
                    ` : ''}
                </div>
                <div class="info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price-before"><b>Precio:</b> $${product.price}</p>
                    <p class="product-price-now"><b>Precio rebajado:</b> $${calculateDiscount(product)}</p>
                </div>
                <div class="card__buttons">
                    <button id="${product.id}Remove" class="card__btn disabled">
                        <span class="material-symbols-outlined">remove</span>
                    </button>
                    <button id="${product.id}Add" class="card__btn">
                        <span class="material-symbols-outlined">add</span>
                    </button>
                </div>                
                <div class="carousel__info">
                    <a href="detailProduct.html?id=${product.id}" class="carousel__info-btn">More information</a>
                    <a href="faq.html?id=${product.id}" class="carousel__info-btn">FAQ's</a>
                </div>
            </div>
        `
    })

    divProductsViewer.innerHTML += salida

}
function handleCategoryViewerOutlet(categoryId) {
    fetch(`https://dummyjson.com/products/category/${categoryId}`)
        .then(res => res.json())
        .then(datos => {
            let filteredProducts = datos.products.filter(product => product.discountPercentage > DISCOUNT)
            fillProductsViewerOutlet(filteredProducts)
            addListenerProducts(filteredProducts)
        })
        // .catch(error => console.error("Error al obtener los productos para la categoría seleccionada:", error))
}
