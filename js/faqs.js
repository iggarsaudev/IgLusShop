function recogerId() {
    let idURL = new URLSearchParams(window.location.search)
    let productId = idURL.get("id")
    return productId
}

function showAnswer(data) {
    let faqs_title = document.getElementById("faqs_title")
    faqs_title.textContent = `FAQ'S OF ${data.title.toUpperCase()}`
    let faqs_img = document.getElementById("faqs_img")
    faqs_img.src = data.thumbnail
    const returnPolicy = document.getElementById("returnPolicy")
    returnPolicy.textContent = `A:This product has ${data.returnPolicy.toLowerCase()}`

    const minimumOrderQuantity = document.getElementById("minimumOrderQuantity")
    minimumOrderQuantity.textContent = `A:The minimum order quantity is ${data.minimumOrderQuantity}`

    const warrantyInfo = document.getElementById("warrantyInfo")
    warrantyInfo.textContent = `A:This product has ${data.warrantyInformation.toLowerCase()}`
    const dimensions = document.getElementById("dimensions")
    dimensions.textContent = `A:This product's exact dimensions are: depth  ${data.dimensions.depth}, width ${data.dimensions.width}, and height ${data.dimensions.height}`

}
function productFaqs() {
    let id_product = recogerId()
    fetch(`https://dummyjson.com/products/${id_product}`)
        .then(res => res.json())
        .then(data => { showAnswer(data) })
}

document.addEventListener('DOMContentLoaded', productFaqs)