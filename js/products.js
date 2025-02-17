/* products.html */
import { CATEGORIES } from './data.js'
import { updateCart, updateCartCount, loadCart } from './cart.js'

let divSelectCategory = document.getElementById("selectCategory")
let divProductsViewer = document.getElementById("productsViewer")

const DISCOUNT = 15

let cart = loadCart() // Cargamos el carrito si lo hubiera
fillSelectCategory(CATEGORIES) // Rellenamos el select de las categorías
getRandomProducts() // Mostramos un carrusel de productos aleatorios de las categorías seleccionadas en data.js

/* Número aleatorio para mostrar dicha cantidad de productos, indicamos 45 porque son los productos que se obtienen con nuestras categorías */
function getRandomNumberProducts() {
    return Math.floor(Math.random() * 45) + 1
}

/* Mostramos, aleatoriamente, productos al cargar la página */
function getRandomProducts() {
    let numProducts = getRandomNumberProducts()
    // console.log(numProducts)

    fetch('https://dummyjson.com/products?limit=0')
        .then(res => res.json())
        .then(datos => {
            // Filtrar productos por categoría
            let filteredProducts = datos.products.filter(product =>
                CATEGORIES.some(category => category.slug === product.category)
            )

            // Mezclamos los productos aleatoriamente
            filteredProducts = filteredProducts.sort(() => Math.random() - 0.5)

            // Seleccionamos el número aleatorio de productos
            let selectedProducts = filteredProducts.slice(0, numProducts)

            showRandomProducts(selectedProducts)
        })
        .catch(error => console.error("Error al obtener los productos:", error))
}
/* End Mostramos todos los productos de primeras */

function showRandomProducts(datos) {
    let salida = `
        <div class="cardCarouselProducts">
            <div id="product-carousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
    `

    datos.forEach((product, index) => {
        // Añadir la clase 'active' al primer elemento para que se muestre al cargar
        const activeClass = index === 0 ? 'active' : ''
        salida += `
                <div class="carousel-item ${activeClass}">
                    <img src="${product.images[0]}" class="d-block w-100 carousel__img" alt="${product.title}" aria-label="${product.title}">
                    <div class="carousel__info">
                        <a href="detailProduct.html?id=${product.id}" class="carousel__info-btn">More information</a>
                    </div>
                    <div class="carousel-caption">
                        <h5 class="carousel__title">${product.title}</h5>
                        <p class="carousel__description">${product.description}</p>
                    </div>
                </div>
        `
    })

    salida += `
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#product-carousel" data-bs-slide="prev">
                    <span class="material-symbols-outlined">arrow_left</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#product-carousel" data-bs-slide="next">
                    <span class="material-symbols-outlined">arrow_right</span>
                </button>
            </div>
        </card>
    `

    divProductsViewer.innerHTML = salida
}

function fillSelectCategory(datos) {
    // Creamos el elemento select
    let selectCategory = document.createElement("select")
    selectCategory.classList.add("selectCategory")
    selectCategory.name = "selectCategory"
    selectCategory.id = "selectCategory"

    // Creamos el primer option (selección por defecto)
    let defaultOption = document.createElement("option")
    defaultOption.value = ""
    defaultOption.disabled = true
    defaultOption.selected = true
    defaultOption.textContent = "Selecciona la categoría del producto"
    selectCategory.appendChild(defaultOption)

    // Rellenamos las categorías
    datos.forEach(category => {
        let option = document.createElement("option")
        option.value = category.slug
        option.classList.add("selectCategory__item")
        option.textContent = category.name
        selectCategory.appendChild(option)
    })

    // Asignamos el select al contenedor
    divSelectCategory.appendChild(selectCategory)

    // Agregamos los eventos seleccionando todos los elementos con la clase selectCategory__item
    selectCategory.addEventListener("change", function () {
        handleCategoryViewer(this.value)
    })
}

function handleCategoryViewer(categoryId) {
    // console.log("Categoría seleccionada:", categoryId)
    fetch(`https://dummyjson.com/products/category/${categoryId}`)
        .then(res => res.json())
        // .then(datos => { console.log(datos) })
        .then(datos => {
            let filteredProducts = datos.products.filter(product => product.discountPercentage < DISCOUNT)
            // .then(datos => { console.log(filteredProducts) })
            fillProductsViewer(filteredProducts)
            addListenerProducts(filteredProducts)
        })
        .catch(error => console.error("Error al obtener los productos para la categoría seleccionada:", error))
}

function fillProductsViewer(datos) {
    let salida = ""
    datos.forEach(product => {
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
                    <p class="product-price"><b>Precio:</b> $${product.price}</p>
                </div>
                <div class="card__buttons">
                    <button id="${product.id}Remove" class="card__btn">
                        <span class="material-symbols-outlined">remove</span>
                    </button>
                    <button id="${product.id}Add" class="card__btn">
                        <span class="material-symbols-outlined">add</span>
                    </button>
                </div>
            </div>
        `
    })

    divProductsViewer.innerHTML = salida
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
    } else if (action === "remove") {
        if (productInCart && productInCart.quantity > 0) {
            productInCart.quantity -= 1
            if (productInCart.quantity === 0) {
                cart = cart.filter(item => item.id !== productId)  // Eliminar si la cantidad es 0
            }
        }
    }
    // console.log(cart)
    updateCart(cart)
    updateCartCount(cart)
}
/* End Obtenemos las categorías, rellenamos el select y mostramos los productos para la categoría que se seleccione */