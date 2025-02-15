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

async function generarImagen(name) {
    let res = await fetch(`https://dummyjson.com/users/search?q=${name}`)
    let data = await res.json()
    console.log(data.users[0])
    let gender = data.users[0].gender

    let resRandomUser = await fetch(`https://randomuser.me/api/?gender=${gender}`)
    let dataRandomUser = await resRandomUser.json()
    console.log(dataRandomUser)
    let image = dataRandomUser.results[0].picture.large

   return image
}



async function crearReview(review,title) {
    let rating = review.rating
    let star = ""
    let username = review.reviewerName
    let firstName = username.split(" ")[0]
    for (let i=0;i<rating;i++) {
        star+=`<span class="material-icons">
        star
      </span>`
    }
    console.log(username)
    let img = await generarImagen(firstName)
    console.log(img)
    let reviewCard = `<div class="review">
    <div class="review_left">
        <span class="review_name">${username}</span>
        <img class="review_img" src="${img}" alt="User image">
        <div class="review_rate">
            ${star}
        </div>
     
    </div>
    <div class="review_right">
      <h2 class="review_product">${title}</h2>
      <h3 class="review_date">${review.date}</h3>
      <p class="review_comment">${review.comment}</p>
    </div>


  </div>`
  return reviewCard
}
async function mostrarReview(product) {
    console.log(product)
    const divReviews = document.getElementById('reviewsContainer')
    const reviews = product.reviews
    const name = product.title

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
    for (let i=0;i<reviews.length;i++) {
        let review = reviews[i]

        let reviewCard = await crearReview(review,name)
        divReviews.innerHTML += reviewCard
    }
       
}
function mostrarAllReviews(category) {
    const divReviews = document.getElementById('reviewsContainer')

    divReviews.innerHTML = ""
    fetch(`https://dummyjson.com/products/category/${category}`)
        .then(res => res.json())
        .then(res => {
            res.products.forEach((product)=>{mostrarReview(product)})
        });
}
