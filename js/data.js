/* Obtenemos la lista de categorías que vamos a utilizar en el proyecto */
export const CATEGORIES = [
    {slug: 'mens-shirts', name: 'Mens Shirts', url: 'https://dummyjson.com/products/category/mens-shirts'},
    {slug: 'mens-shoes', name: 'Mens Shoes', url: 'https://dummyjson.com/products/category/mens-shoes'},
    {slug: 'mens-watches', name: 'Mens Watches', url: 'https://dummyjson.com/products/category/mens-watches'},
    {slug: 'fragrances', name: 'Fragrances', url: 'https://dummyjson.com/products/category/fragrances'},
    {slug: 'womens-bags', name: 'Womens Bags', url: 'https://dummyjson.com/products/category/womens-bags'},
    {slug: 'womens-dresses', name: 'Womens Dresses', url: 'https://dummyjson.com/products/category/womens-dresses'},
    {slug: 'womens-jewellery', name: 'Womens Jewellery', url: 'https://dummyjson.com/products/category/womens-jewellery'},
    {slug: 'womens-shoes', name: 'Womens Shoes', url: 'https://dummyjson.com/products/category/womens-shoes'},
    {slug: 'laptops', name: 'Laptops', url: 'https://dummyjson.com/products/category/laptops'}
]

export const DISCOUNT = 15

export function calculateDiscount(product) {
    return Math.round(Number(product.price)*(1-Number(product.discountPercentage)/100),2)
}