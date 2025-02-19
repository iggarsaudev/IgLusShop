import { CATEGORIES } from './data.js'
//Popup
document.getElementById('close_popup').addEventListener('click',()=>{
    document.getElementById('popup').style.display='none'
})

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('popup').style.display='flex'
    setTimeout(()=>{document.getElementById('popup').style.display='none'},5000)

})
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}

function createCarouselImages() {
    let carouselImages = document.getElementById('carouselImages-products')
    carouselImages.innerHTML = ""
    let childCarousel
    for (let i = 0; i < 5; i++) {
        let category_index = getRandomInt(0, CATEGORIES.length)
        let category = CATEGORIES[category_index].slug
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then(res => res.json())
            .then(res => {
                let numberOfProducts = res.products.length
                let product_index = getRandomInt(0, numberOfProducts)
                let image = res.products[product_index].images[0]
                if (i == 0) {
                    childCarousel = `<div class="carousel-item active">
                <img src="${image}" class="carousel-item-image" alt="${res.title}">
                </div>`
                }
                else {
                    childCarousel = `<div class="carousel-item">
                <img src="${image}" class="carousel-item-image" alt="${res.title}">
                </div>`
                }

                carouselImages.innerHTML += childCarousel
            })
    }
}

async function getImageCategory(url) {
    let img = await fetch(url)
        .then(res => res.json())
        .then(res => { return res.products[0].images[0] })

    return img
}

async function createCarouselCategory() {
    let carouselImages = document.getElementById('carouselImages-categories')
    carouselImages.innerHTML = ""
    let childCarousel
    let res = CATEGORIES
    for (let i = 0; i < res.length; i++) {
        let category = res[i]
        let categoryName = category.name
        let categoryURL = category.url
        let categoryImg = await getImageCategory(categoryURL)
        if (i == 0) {
            childCarousel = `<div class="carousel-item active">
            <img src="${categoryImg}" class="carousel-item-image" alt="${categoryName}">
            <h3>${categoryName}</h3>

            </div>`
        }
        else {
            childCarousel = `<div class="carousel-item">
            <img src="${categoryImg}" class="carousel-item-image" alt="${categoryName}">
            <h3>${categoryName}</h3>
            </div>`
        }

        carouselImages.innerHTML += childCarousel
    }
}


window.addEventListener("DOMContentLoaded", createCarouselImages)
window.addEventListener("DOMContentLoaded", createCarouselCategory)
