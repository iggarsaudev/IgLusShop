import { CATEGORIES } from './data.js'



async function generarImagen(name) {
    let res = await fetch(`https://dummyjson.com/users/search?q=${name}`)
    let data = await res.json()
    let gender = data.users[0].gender

    let resRandomUser = await fetch(`https://randomuser.me/api/?gender=${gender}`)
    let dataRandomUser = await resRandomUser.json()
    let image = dataRandomUser.results[0].picture.large

   return image
}

function formatearFecha(fechaSinFormatear) {
    let fecha = new Date(fechaSinFormatear);

    let formato = fecha.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Madrid"
    });

    return formato 
}

async function crearReview(review,title,img_product) {
    let rating = review.rating
    let star = ""
    let username = review.reviewerName
    let firstName = username.split(" ")[0]
    for (let i=0;i<rating;i++) {
        star+=`<span class="material-icons">
        star
      </span>`
    }
    let img = await generarImagen(firstName)
    let reviewCard = `<div class="review">
    <div>
        <span class="review_name">${username}</span>
        <img class="review_img" src="${img}" alt="User image">
        <div>
            ${star}
        </div>
     
    </div>
    <div class="review_right">
      <h2 class="review_product">${title}</h2>
      <img class="review_img-product" src="${img_product}" alt="User image">

      <h3 class="review_date">${formatearFecha(review.date)}</h3>
      <p class="review_comment">${review.comment}</p>
    </div>


  </div>`
  return reviewCard
}

async function mostrarReview(product) {   
    const divReviews = document.getElementById('reviewsContainer')
    const img_product = product.images[0]
    const reviews = product.reviews
    const name = product.title

    for (let i=0;i<reviews.length;i++) {
        let review = reviews[i]

        let reviewCard = await crearReview(review,name,img_product)
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

function selectCategories() {
    const divSelectCategory = document.getElementById("selectCategoryDiv")
    let selectCategory = document.createElement("select")
    selectCategory.classList.add("selectCategory")
    selectCategory.name = "selectCategory"
    selectCategory.id = "selectCategory"

    let defaultOption = document.createElement("option")
    defaultOption.value = ""
    defaultOption.disabled = true
    defaultOption.selected = true
    defaultOption.textContent = "Selecciona la categoría del producto"
    selectCategory.appendChild(defaultOption)

    mostrarAllReviews(CATEGORIES[0].slug)

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