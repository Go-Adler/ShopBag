const sortByNameAToZ = document.querySelector("#sortByNameAToZ")
const sortByNameZToA = document.querySelector("#sortByNameZToA")
const sortByPriceHighToLow = document.querySelector("#sortByPriceHighToLow")
const sortByPriceLowToHigh = document.querySelector("#sortByPriceLowToHigh")
const sortByDefault = document.querySelector("#sortByDefault")
const spinner = document.querySelector(".spinnerDiv")
const search = document.querySelector(".search")
const searchButton = document.querySelector(".fa-magnifying-glass")
const eachProduct = document.querySelector(".eachProduct")
const allSort = document.querySelectorAll(".sort")
const buttonArea = document.querySelector(".buttonArea")
const pageButtons = document.querySelectorAll(".pageButton")
const errorMessage = document.querySelector(".errorMessage")
const category = document.querySelectorAll(".categoryBarElement")

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
            console.error("Error in wishlist add:", error)
            errorMessage.textContent = `Error in wishlist add: ${error}`
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
            console.error("Error in wishlist remove:", error)
            errorMessage.textContent = `Error in wishlist remove: ${error}`
          })
      }
    })
  })
}

let sort = 'nameA-Z'
let searchOn = false

favourite()

sortByNameAToZ.addEventListener('click', ()=> {
  sort = 'nameA-Z'
  if (!searchOn) {
    eachProduct.innerHTML = ""
  spinner.classList.remove("d-none")
  spinner.classList.add("d-block")
  fetch("/user/products/sortByNameAToZ")
  .then((response) => {
    spinner.classList.add("d-none")
    spinner.classList.remove("d-block")
    if (response.ok) {
      return response.json()
    }
  })
  .then((data) => {
    allSort.forEach(element => {
      element.style.color = "black";
    });
    sortByNameAToZ.style.color = "#60970f"
      data.products.docs.forEach((product, index) => {
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
    console.error("Error in sort a to z:", error)
    errorMessage.textContent = `Error in sort a to z: ${error}`
  })
  } else {
    eachProduct.innerHTML = ""
    spinner.classList.remove("d-none")
    spinner.classList.add("d-block")
    const requestBody = { 
      searchQuery: search.value,
      sort
     }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
    fetch("/user/products/search", requestOptions)
    .then((response) => {
      allSort.forEach(element => {
        element.style.color = "black";
      });
      sortByNameAToZ.style.color = "#60970f"
      spinner.classList.add("d-none")
      spinner.classList.remove("d-block")
      if (response.ok) {
        return response.json()
      }
    })
    .then((data) => {
      searchButton.style.color = "#60970f"
      eachProduct.innerHTML = ""
        data.products.docs.forEach((product) => {
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
      console.error("Error in search:", error)
      errorMessage.textContent = `Error in search: ${error}`
    })
  }
})

sortByNameZToA.addEventListener('click', ()=> {
  sort = 'nameZ-A'
 if (!searchOn) {
  eachProduct.innerHTML = ""
  spinner.classList.remove("d-none")
  spinner.classList.add("d-block")
  fetch("/user/products/sortByNameZToA")
  .then((response) => {
    spinner.classList.add("d-none")
    spinner.classList.remove("d-block")
    if (response.ok) {
      return response.json()
    }
  })
  .then((data) => {
    allSort.forEach(element => {
      element.style.color = "black";
    });
    sortByNameZToA.style.color = "#60970f"
      data.products.docs.forEach((product) => {
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
    console.error("Error in sort z to a:", error)
    errorMessage.textContent = `Error in sort z to a: ${error}`
  })
 } else {
  eachProduct.innerHTML = ""
  spinner.classList.remove("d-none")
  spinner.classList.add("d-block")
  const requestBody = { 
    searchQuery: search.value,
    sort
   }
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }
  fetch("/user/products/search", requestOptions)
  .then((response) => {
    allSort.forEach(element => {
      element.style.color = "black";
    });
    sortByNameZToA.style.color = "#60970f"
    spinner.classList.add("d-none")
    spinner.classList.remove("d-block")
    if (response.ok) {
      return response.json()
    }
  })
  .then((data) => {
    searchButton.style.color = "#60970f"
    eachProduct.innerHTML = ""
      data.products.docs.forEach((product) => {
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
    console.error("Error in search:", error)
    errorMessage.textContent = `Error in search: ${error}`
  })
 }
})

sortByPriceLowToHigh.addEventListener('click', ()=> {
  sort = 'priceLowToHigh'
  if(!searchOn) {
  eachProduct.innerHTML = ""
  spinner.classList.remove("d-none")
  spinner.classList.add("d-block")
  fetch("/user/products/sortByPriceLowToHigh")
  .then((response) => {
    spinner.classList.add("d-none")
    spinner.classList.remove("d-block")
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
      data.products.docs.forEach((product) => {
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
    console.error("Error in sort low to high:", error)
    errorMessage.textContent = `Error in low to high: ${error}`
  })
 } else {
  eachProduct.innerHTML = ""
  spinner.classList.remove("d-none")
  spinner.classList.add("d-block")
  const requestBody = { 
    searchQuery: search.value,
    sort
   }
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }
  fetch("/user/products/search", requestOptions)
  .then((response) => {
    allSort.forEach(element => {
      element.style.color = "black";
    });
    sortByPriceLowToHigh.style.color = "#60970f"

    spinner.classList.add("d-none")
    spinner.classList.remove("d-block")
    if (response.ok) {
      return response.json()
    }
  })
  .then((data) => {
    searchButton.style.color = "#60970f"
    eachProduct.innerHTML = ""
      data.products.docs.forEach((product) => {
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
    console.error("Error in search:", error)
    errorMessage.textContent = `Error in search: ${error}`
  })
}
})

sortByPriceHighToLow.addEventListener('click', ()=> {
  sort = 'priceHighToLow'
  if(!searchOn) {
    eachProduct.innerHTML = ""
  spinner.classList.remove("d-none")
  spinner.classList.add("d-block")
  fetch("/user/products/sortByPriceHighToLow")
  .then((response) => {
    spinner.classList.add("d-none")
    spinner.classList.remove("d-block")
    if (response.ok) {
      return response.json()
    }
  })
  .then((data) => {
    allSort.forEach(element => {
      element.style.color = "black";
    });
    sortByPriceHighToLow.style.color = "#60970f"
    pageButtons.forEach(element => {
      element.innerHTML
    })
    eachProduct.innerHTML = ""
      data.products.docs.forEach((product) => {
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
    console.error("Error in sort high to low:", error)
    errorMessage.textContent = `Error in sort high to low: ${error}`
  })
  } else {
    eachProduct.innerHTML = ""
    spinner.classList.remove("d-none")
    spinner.classList.add("d-block")
    const requestBody = { 
      searchQuery: search.value,
      sort
     }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
    fetch("/user/products/search", requestOptions)
    .then((response) => {
      allSort.forEach(element => {
        element.style.color = "black";
      });
    sortByPriceHighToLow.style.color = "#60970f"

      spinner.classList.add("d-none")
      spinner.classList.remove("d-block")
      if (response.ok) {
        return response.json()
      }
    })
    .then((data) => {
      searchButton.style.color = "#60970f"
      eachProduct.innerHTML = ""
        data.products.docs.forEach((product) => {
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
      console.error("Error in search:", error)
      errorMessage.textContent = `Error in search: ${error}`
    })
   }
})

searchButton.addEventListener('click', ()=> {
  eachProduct.innerHTML = ""
  spinner.classList.remove("d-none")
  spinner.classList.add("d-block")
  const requestBody = { 
    searchQuery: search.value,
    sort
   }
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }
  fetch("/user/products/search", requestOptions)
  .then((response) => {
    searchOn = true
    spinner.classList.add("d-none")
    spinner.classList.remove("d-block")
    if (response.ok) {
      return response.json()
    }
  })
  .then((data) => {
    searchButton.style.color = "#60970f"
    eachProduct.innerHTML = ""
      data.products.docs.forEach((product) => {
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
    console.error("Error in search:", error)
    errorMessage.textContent = `Error in search: ${error}`
  })
})

pageButtons.forEach((button) => {
  button.addEventListener('click', ()=> {
 

  eachProduct.innerHTML = ""
  spinner.classList.remove("d-none")
  spinner.classList.add("d-block")

  const page = button.dataset.page
  const requestBody = { page, fetch: true }
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }
  fetch(`/user/home`, requestOptions)
  .then((response) => {
    spinner.classList.add("d-none")
    spinner.classList.remove("d-block")
    if (response.ok) {
      return response.json()
    }
  })
  .then((data) => {
    pageButtons.forEach(element => {
      element.classList.remove("currentPage")
    })
    allSort.forEach(element => {
      element.style.color = "black";
    });
    searchButton.style.color = "#60970f"
      data.products.docs.forEach((product) => {
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
                          ${ data.wishlist.includes(product._id)
                            ? `<i class="fa-solid fa-heart heart"></i>`
                            : `<i class="fa-regular fa-heart heart"></i>`}
                          </a>
                  </div>
              </div>
          </div>
          </div>`
      }
    })

    pageButtons[data.products.page - 1].classList.add("currentPage")
    favourite()
  })
  .catch((error) => {
    console.error("Error in loading page:", error)
    errorMessage.textContent = `Error in loading page: ${error}`
  })
})
})

category.forEach((button) => {
  button.addEventListener('click', ()=> {
  eachProduct.innerHTML = ""
  errorMessage.innerHTML = ''
  spinner.classList.remove("d-none")
  spinner.classList.add("d-block")
  const categoryId = button.dataset.id
  const requestBody = { categoryId }
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }
  fetch(`/user/category`, requestOptions)
  .then(async (response) => {
    spinner.classList.add("d-none")
    spinner.classList.remove("d-block")
    if (response.ok) {
      return response.json()
    } else {
      const data = await response.json()
      throw new Error(data.message)
    }
  })
  .then((data) => {
    pageButtons.forEach(element => {
      element.classList.remove("currentPage")
    })
    category.forEach(element => {
      element.style.color = "black";
    });
    button.style.color = "#60970f"
      data.products.docs.forEach((product) => {
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
                          ${data.wishlist && data.wishlist.includes(product._id)
                            ? `<i class="fa-solid fa-heart heart"></i>`
                            : `<i class="fa-regular fa-heart heart"></i>`}
                          </a>
                  </div>
              </div>
          </div>
          </div>`
      }
    })

    pageButtons[data.products.page - 1].classList.add("currentPage")
    favourite()
  })
  .catch((error) => {
    console.error("Error in loading page:", error)
    errorMessage.textContent = `Error in loading page: ${error}`
  })
})
})

const searchFunction = () => {
  eachProduct.innerHTML = ""
  spinner.classList.remove("d-none")
  spinner.classList.add("d-block")
  const requestBody = { 
    searchQuery: search.value,
    sort
   }
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }
  fetch("/user/products/search", requestOptions)
  .then((response) => {
    searchOn = true
    spinner.classList.add("d-none")
    spinner.classList.remove("d-block")
    if (response.ok) {
      return response.json()
    }
  })
  .then((data) => {
    searchButton.style.color = "#60970f"
    eachProduct.innerHTML = ""
      data.products.docs.forEach((product) => {
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
    console.error("Error in search:", error)
    errorMessage.textContent = `Error in search: ${error}`
  })
}