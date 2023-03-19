const sortByNameAToZ = document.querySelector("#sortByNameAToZ")
const sortByNameZToA = document.querySelector("#sortByNameZToA")
const sortByPriceHighToLow = document.querySelector("#sortByPriceHighToLow")
const sortByPriceLowToHigh = document.querySelector("#sortByPriceLowToHigh")
const sortByDefault = document.querySelector("#sortByPriceLowToHig")

const eachProduct = document.querySelector(".eachProduct")
const allSort = document.querySelectorAll(".sort")





const favourite = () => {
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
}

favourite()

sortByNameAToZ.addEventListener('click', ()=> {
  fetch("/user/products/sortByNameAToZ")
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((data) => {
    allSort.forEach(element => {
      element.style.color = "black";
    });
    sortByNameAToZ.style.color = "#60970f"
    eachProduct.innerHTML = ""
      data.products.forEach((product, index) => {
        if (!product.isDisabled) {
          eachProduct.innerHTML += `
          <div class="d-flex flex-column gap-1">
          <a href="/user/products/${ product._id }">
              <div class="hover">
                  <div class="card">
                      <div class="d-flex align-items-center justify-content-center imageDiv">
                          <img src="/images/${ product.images[0].filename }" class="productImg" alt="${ product.name }">
                      </div>
                  </div>
              </div>
          </a>

          <div class="w-100 card cardBottom container">
              <div class="row p-1">
                  <div class="col-6 d-flex flex-column">
                      <h5> ${ product.productName } </h5>
                      <h6>₹ ${ product.price } </h6>
                  </div>

                  <div class="col-6 d-flex justify-content-end align-items-center wishListIcon gap-3">
                          <a class="wishlistHeart cursor-pointer" data-id="${ product._id }">
                          ${data.wishlist.includes(product._id)
                            ? `<i class="fa-solid fa-heart heart"></i>`
                            : `<i class="fa-regular fa-heart heart"></i>`}
                          </a>
                  </div>
              </div>
          </div>
      </div>`
      }
    })
  favourite()
  })
  .catch((error) => {
    errorMessage.textContent = error.message
  })
})

sortByNameZToA.addEventListener('click', ()=> {
  fetch("/user/products/sortByNameZToA")
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((data) => {
    allSort.forEach(element => {
      element.style.color = "black";
    });
    sortByNameZToA.style.color = "#60970f"
    eachProduct.innerHTML = ""
      data.products.forEach((product) => {
        if (!product.isDisabled) {
          eachProduct.innerHTML += `
          <div class="d-flex flex-column gap-1">
          <a href="/user/products/${ product._id }">
              <div class="hover">
                  <div class="card">
                      <div class="d-flex align-items-center justify-content-center imageDiv">
                          <img src="/images/${ product.images[0].filename }" class="productImg" alt="${ product.name }">
                      </div>
                  </div>
              </div>
          </a>

          <div class="w-100 card cardBottom container">
              <div class="row p-1">
                  <div class="col-6 d-flex flex-column">
                      <h5> ${ product.productName } </h5>
                      <h6>₹ ${ product.price } </h6>
                  </div>

                  <div class="col-6 d-flex justify-content-end align-items-center wishListIcon gap-3">
                          <a class="wishlistHeart cursor-pointer" data-id="${ product._id }">
                          ${data.wishlist.includes(product._id)
                            ? `<i class="fa-solid fa-heart heart"></i>`
                            : `<i class="fa-regular fa-heart heart"></i>`}
                          </a>
                  </div>
              </div>
          </div>
      </div>`
      }
    })
  favourite()
  })
  .catch((error) => {
    errorMessage.textContent = error.message
  })
})

sortByPriceLowToHigh.addEventListener('click', ()=> {
  fetch("/user/products/sortByPriceLowToHigh")
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((data) => {
    allSort.forEach(element => {
      element.style.color = "black";
    });
    sortByPriceLowToHigh.style.color = "#60970f"
    eachProduct.innerHTML = ""
      data.products.forEach((product) => {
        if (!product.isDisabled) {
          eachProduct.innerHTML += `
          <div class="d-flex flex-column gap-1">
          <a href="/user/products/${ product._id }">
              <div class="hover">
                  <div class="card">
                      <div class="d-flex align-items-center justify-content-center imageDiv">
                          <img src="/images/${ product.images[0].filename }" class="productImg" alt="${ product.name }">
                      </div>
                  </div>
              </div>
          </a>

          <div class="w-100 card cardBottom container">
              <div class="row p-1">
                  <div class="col-6 d-flex flex-column">
                      <h5> ${ product.productName } </h5>
                      <h6>₹ ${ product.price } </h6>
                  </div>

                  <div class="col-6 d-flex justify-content-end align-items-center wishListIcon gap-3">
                          <a class="wishlistHeart cursor-pointer" data-id="${ product._id }">
                          ${data.wishlist.includes(product._id)
                            ? `<i class="fa-solid fa-heart heart"></i>`
                            : `<i class="fa-regular fa-heart heart"></i>`}
                          </a>
                  </div>
              </div>
          </div>
      </div>`
      }
    })
  favourite()
  })
  .catch((error) => {
    errorMessage.textContent = error.message
  })
})

sortByPriceHighToLow.addEventListener('click', ()=> {
  fetch("/user/products/sortByPriceHighToLow")
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((data) => {
    allSort.forEach(element => {
      element.style.color = "black";
    });
    sortByPriceHighToLow.style.color = "#60970f"
    eachProduct.innerHTML = ""
      data.products.forEach((product) => {
        if (!product.isDisabled) {
          eachProduct.innerHTML += `
          <div class="d-flex flex-column gap-1">
          <a href="/user/products/${ product._id }">
              <div class="hover">
                  <div class="card">
                      <div class="d-flex align-items-center justify-content-center imageDiv">
                          <img src="/images/${ product.images[0].filename }" class="productImg" alt="${ product.name }">
                      </div>
                  </div>
              </div>
          </a>

          <div class="w-100 card cardBottom container">
              <div class="row p-1">
                  <div class="col-6 d-flex flex-column">
                      <h5> ${ product.productName } </h5>
                      <h6>₹ ${ product.price } </h6>
                  </div>

                  <div class="col-6 d-flex justify-content-end align-items-center wishListIcon gap-3">
                          <a class="wishlistHeart cursor-pointer" data-id="${ product._id }">
                          ${data.wishlist.includes(product._id)
                            ? `<i class="fa-solid fa-heart heart"></i>`
                            : `<i class="fa-regular fa-heart heart"></i>`}
                          </a>
                  </div>
              </div>
          </div>
      </div>`
      }
    })
  favourite()
  })
  .catch((error) => {
    errorMessage.textContent = error.message
  })
})

productSortByDefault.addEventListener('click', ()=> {
  fetch("/user/products/sortByPriceHighToLow")
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((data) => {
    allSort.forEach(element => {
      element.style.color = "black";
    });
    sortByPriceHighToLow.style.color = "#60970f"
    eachProduct.innerHTML = ""
      data.products.forEach((product) => {
        if (!product.isDisabled) {
          eachProduct.innerHTML += `
          <div class="d-flex flex-column gap-1">
          <a href="/user/products/${ product._id }">
              <div class="hover">
                  <div class="card">
                      <div class="d-flex align-items-center justify-content-center imageDiv">
                          <img src="/images/${ product.images[0].filename }" class="productImg" alt="${ product.name }">
                      </div>
                  </div>
              </div>
          </a>

          <div class="w-100 card cardBottom container">
              <div class="row p-1">
                  <div class="col-6 d-flex flex-column">
                      <h5> ${ product.productName } </h5>
                      <h6>₹ ${ product.price } </h6>
                  </div>

                  <div class="col-6 d-flex justify-content-end align-items-center wishListIcon gap-3">
                          <a class="wishlistHeart cursor-pointer" data-id="${ product._id }">
                          ${data.wishlist.includes(product._id)
                            ? `<i class="fa-solid fa-heart heart"></i>`
                            : `<i class="fa-regular fa-heart heart"></i>`}
                          </a>
                  </div>
              </div>
          </div>
      </div>`
      }
    })
  favourite()
  })
  .catch((error) => {
    errorMessage.textContent = error.message
  })
})