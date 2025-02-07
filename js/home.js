function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function createCarouselImages() {
    let categories = ['mens-shirts','mens-shoes','mens-watches','womens-bags','womens-dresses','womens-jewellery','womens-shoes','womens-watches']
    let carouselImages = document.getElementById('carouselImages');
    carouselImages.innerHTML = ""
    for (let i=0;i<3;i++) {
        let category_index = getRandomInt(0, 7)
        let category = categories[category_index]
        fetch(`https://dummyjson.com/products/category/${category}`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
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

window.addEventListener("DOMContentLoaded", createCarouselImages);