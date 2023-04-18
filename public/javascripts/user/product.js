const addToCart = document.querySelector('#addToCartButton')
const goToCartButton = document.querySelector('.goToCartButton')
const addToCartArea = document.querySelector('.addToCartArea')
const goToCartArea = document.querySelector('.goToCartArea')
const errorMessageArea = document.querySelector('.errorMessageArea')

addToCart.addEventListener('click', (event) => {
  event.preventDefault()
  const productId = addToCart.dataset.id
  fetch(`/user/products/add-cart/${productId}`)
  .then(response => {
    if (response.ok) {
      goToCartArea.classList.remove('d-none')
      addToCartArea.classList.add('d-none')
    } else {
      throw new Error('Adding item to cart failed')
    }
  })
  .catch(error => {
    errorMessageArea.innerHTML = `${error}`
  })
})