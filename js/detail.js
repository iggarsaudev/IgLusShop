import { calculateDiscount,DISCOUNT } from './data.js'
import { updateCart, updateCartCount, loadCart } from './cart.js'
import { addListenerProducts } from './general.js'

let detailsContainer = document.getElementById("detailsContainer")
let cart = loadCart()
getProductDetails()

function recogerId() {
    let idURL = new URLSearchParams(window.location.search)
    let productId = idURL.get("id")
    return productId
}

function getProductDetails() {
    let id_product = recogerId()
    fetch(`https://dummyjson.com/products/${id_product}`)
        .then(res => res.json())
        // .then(datos => { console.log(datos) })
        .then(data => { showProductsDetail(data) })
}

function showProductsDetail(datos) {
    let star = ""
    for (let i = 0; i < Math.round(datos.rating); i++) {
        star += `<span class="material-symbols-outlined star">star</span>`
    }
    let price = datos.price

    if (Number(datos.discountPercentage)>DISCOUNT) {
       price =  calculateDiscount(datos)           
    }
    let salida = `
                <div class="product-detail">
                    <img id="productImg" class="product-detail__image" src="${datos.images[0]}" alt="${datos.title}">            
                    <div class="product-detail__info">
                        <h2 id="product-title" class="product-detail__title">${datos.title}</h2>
                        <div class="product-detail__rating">${star}</div>
                        <p id="product-description" class="product-detail__description">${datos.description}</p>
                        <p id="product-price" class="product-detail__price">$${price}</p>
                    </div>
                    <div class="card__buttons">
                        <button id="${datos.id}Remove" class="card__btn disabled">
                            <span class="material-symbols-outlined">remove</span>
                        </button>
                        <button id="${datos.id}Add" class="card__btn">
                            <span class="material-symbols-outlined">add</span>
                        </button>
                        <a href="faq.html?id=${datos.id}" class="card__btn">FAQ's</a>
                    </div>
                </div>
            `
    detailsContainer.innerHTML = salida

    addListenerProducts([datos],updateCart,updateCartCount,cart)
}