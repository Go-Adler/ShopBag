const wishlistHeart = document.querySelectorAll(".wishlistHeart")
const iconHeart = document.querySelectorAll(".heart")


wishlistHeart.forEach((button, index) => {
  button.addEventListener("click", () => {
    const id = button.dataset.id
    const requestBody = { id }
    if (iconHeart[index].classList.contains("fa-regular")) {
      // Create the options object for the fetch request
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }

      // Send the fetch request to the server
      fetch("products/add-wishlist", requestOptions)
        .then((response) => {
          if (response.ok) {
            iconHeart[index].classList.remove("fa-regular")
            iconHeart[index].classList.add("fa-solid")
          }
        })
        .catch((error) => {
          // Update the error message on failed response
          errorMessage.textContent = error.message
        })
    } else {
      // Create the options object for the fetch request
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
            iconHeart[index].classList.add("fa-regular")
            iconHeart[index].classList.remove("fa-solid")
          }
        })
        .catch((error) => {
          // Update the error message on failed response
          errorMessage.textContent = error.message
        })
    }
  })
})