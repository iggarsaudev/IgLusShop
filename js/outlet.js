import { CATEGORIES,calculateDiscount,DISCOUNT } from './data.js'
import { updateCart, updateCartCount, loadCart } from './cart.js'
import { addListenerProducts } from './general.js'


handleCategoryViewer()
let cart = loadCart()

function fillProductsViewerOutlet(datos)  {
    let divProductsViewer = document.getElementById("productsViewer")
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
                    <p class="product-price-before">$${product.price}</p>
                    <p class="product-price-now">$${calculateDiscount(product)}</p>
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

function handleCategoryViewer() {
    // console.log("Categoría seleccionada:", categoryId)
    fetch('https://dummyjson.com/products?limit=0')
    .then(res => res.json())
    .then(datos => {
        // Filtrar productos por categoría
            let filteredProducts = datos.products.filter(product =>
            CATEGORIES.some(category => category.slug === product.category) 
        )
            let filteredProductsDiscount = filteredProducts.filter(product => Number(product.discountPercentage) > DISCOUNT)
            // .then(datos => { console.log(filteredProducts) })
            fillProductsViewerOutlet(filteredProductsDiscount)
            addListenerProducts(filteredProductsDiscount,updateCart,updateCartCount,cart)
        })
        .catch(error => console.error("Error al obtener los productos para la categoría seleccionada:", error))
}
