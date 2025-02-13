import { CATEGORIES } from './data.js'

function selectCategories() {
    const divSelectCategory = document.getElementById("selectCategoryDiv")

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

    CATEGORIES.forEach(category => {
        let option = document.createElement("option")
        option.value = category.slug
        option.classList.add("selectCategory__item")
        option.textContent = category.name
        selectCategory.appendChild(option)
    })

    
    selectCategory.addEventListener('change',(e)=>{mostrarAllReviews(e.target.value)})
    divSelectCategory.appendChild(selectCategory)
}
document.addEventListener('DOMContentLoaded',selectCategories)

function mostrarReview(reviews) {
    const divReviews = document.getElementById('reviewsContainer')

//     comment
//     : 
//     "Not as described!"
//     date
//     : 
//     "2024-05-23T08:56:21.627Z"
//     rating
//     : 
//     1
//     reviewerEmail
//     : 
//     "leah.hughes@x.dummyjson.com"
//     reviewerName
//     : 
// "Leah Hughes"
    
    reviews.forEach(
        (e)=>{
            let reviewCard = `<p>${e.comment}</p>`
            divReviews.innerHTML += reviewCard
        }
    )

}
function mostrarAllReviews(category) {
    const divReviews = document.getElementById('reviewsContainer')

    divReviews.innerHTML = ""
    fetch(`https://dummyjson.com/products/category/${category}`)
        .then(res => res.json())
        .then(res => {
            console.log(res.products)
            res.products.forEach((product)=>{mostrarReview(product.reviews)})
        });
}
