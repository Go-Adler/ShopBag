const wishlistHeart = document.querySelectorAll(".wishlistHeart")
const product = document.querySelectorAll(".product")
const errorMessage = document.querySelector(".errorMessage")

wishlistHeart.forEach((button, index) => {
  button.addEventListener("click", () => {
    const id = button.dataset.id
    const requestBody = { id }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }

    // Send the fetch request to the server
    fetch("products/remove-wishlist", requestOptions)
      .then((response) => {
        if (response.ok) {
          product[index].remove()
        }
      })
      .catch((error) => {
        // Update the error message on failed response
        errorMessage.textContent = error.message
      })
  })
})
