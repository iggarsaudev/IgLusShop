function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function createCarouselImages() {
    let categories = ['mens-shirts','mens-shoes','mens-watches','womens-bags','womens-dresses','womens-jewellery','womens-shoes','womens-watches']
    let carouselImages = document.getElementById('carouselImages-products');
    carouselImages.innerHTML = ""
    for (let i=0;i<5;i++) {
        let category_index = getRandomInt(0, 7)
        let category = categories[category_index]
        fetch(`https://dummyjson.com/products/category/${category}`)
        .then(res => res.json())
        .then(res => {
            let numberOfProducts = res.products.length
            let product_index = getRandomInt(0, numberOfProducts)
            let image = res.products[product_index].images[0]
            if (i==0) {
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
        });
    }
}
async function getImageCategory(url) {
    let img = await fetch(url)
            .then(res => res.json())
            .then(res => {return res.products[0].images[0]})
    
    return img
}
async function getCategories() {
    let data = await fetch(`https://dummyjson.com/products/categories/`)
    .then(res => res.json())
    .then(res => {return res})
    return data
}
async function createCarouselCategory() {
    let carouselImages = document.getElementById('carouselImages-categories');
    carouselImages.innerHTML = ""
    res = await getCategories()
    
    for (let i=0;i<res.length;i++) {
        let category=res[i]
        let categoryName = category.name
        let categoryURL = category.url
        let categoryImg = await getImageCategory(categoryURL)
        if (i==0) {
            childCarousel = `<div class="carousel-item active">
            <h3>${categoryName}</h3>
            <img src="${categoryImg}" class="carousel-item-image" alt="${categoryName}">
            </div>`
        }
        else {
            childCarousel = `<div class="carousel-item">
            <img src="${categoryImg}" class="carousel-item-image" alt="${categoryName}">
            <h3>${categoryName}</h3>

            </div>`
        }
        
        carouselImages.innerHTML+=childCarousel
    }
}

window.addEventListener("DOMContentLoaded", createCarouselImages);
window.addEventListener("DOMContentLoaded", createCarouselCategory);