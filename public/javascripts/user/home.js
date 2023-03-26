const spinner = document.querySelector('.spinnerDiv')
const search = document.querySelector('.search')
const searchButton = document.querySelector('.fa-magnifying-glass')
const eachProduct = document.querySelector('.eachProduct')
const buttonArea = document.querySelector('.buttonArea')
const errorMessage = document.querySelector('.errorMessage')
const category = document.querySelectorAll('.categoryBarElement')
const sort = document.querySelectorAll('.sort')

let pageButtons
let sortQuery = 'nameA-Z'
let categoryQuery = 'all'
let searchQuery = ''
let pageQuery = 1

let categorySelected = false
let sortSelected = false
let searchSelected = false
let pageSelected = false

// Wishlist remove and add function
const favourite = () => {
  const wishlistHeart = document.querySelectorAll('.wishlistHeart')
  const iconHeart = document.querySelectorAll('.heart')

  wishlistHeart.forEach((button, index) => {
    button.addEventListener('click', () => {
      const id = button.dataset.id
      const requestBody = { id }
      if (iconHeart[index].classList.contains('fa-regular')) {
        // Create the options object for the fetch request
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }

        // Send the fetch request to the server
        fetch('products/add-wishlist', requestOptions)
          .then((response) => {
            if (response.ok) {
              iconHeart[index].classList.remove('fa-regular')
              iconHeart[index].classList.add('fa-solid')
            }
          })
          .catch((error) => {
            console.error('Error in wishlist add:', error)
            errorMessage.textContent = `Error in wishlist add: ${error}`
          })
      } else {
        // Create the options object for the fetch request
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }

        // Send the fetch request to the server
        fetch('products/remove-wishlist', requestOptions)
          .then((response) => {
            if (response.ok) {
              iconHeart[index].classList.add('fa-regular')
              iconHeart[index].classList.remove('fa-solid')
            }
          })
          .catch((error) => {
            // Update the error message on failed response
            console.error('Error in wishlist remove:', error)
            errorMessage.textContent = `Error in wishlist remove: ${error}`
          })
      }
    })
  })
}

const pageFunction = (button) => {
  button.addEventListener('click', () => {
  pageSelected = true
  productFunctionMain(button)
  })
}

const buttonFunction = () => {
  pageButtons = document.querySelectorAll('.pageButton')
  pageButtons.forEach(button => {
    pageFunction(button)
  })
}
favourite()
buttonFunction()

const productFunctionMain = (button) => {
    // Removing products displayed and adding spinner
    eachProduct.innerHTML = ''
    errorMessage.textContent = ''
    spinner.classList.remove('d-none')
    spinner.classList.add('d-flex')

    // Getting values to send
    if (categorySelected) {
      categoryQuery = button.dataset.id
      categorySelected = false
      category.forEach(category => {
        category.style.color = '#212529'
      })
      button.style.color = '#5B9208'
    } else if (sortSelected) {
      sortQuery = button.dataset.value
      sort.forEach(sort => {
        sort.style.color = '#212529'
      }) 
      button.style.color = '#5B9208'
      sortSelected = false
    } else if (searchSelected) {
      searchQuery = search.value
      searchSelected = false
    } else if (pageSelected) {
      pageQuery = button.dataset.page
      pageSelected = false
    }

    // Body of fetch
    const requestBody = {
      searchQuery,
      sortQuery,
      categoryQuery,
      pageQuery
    }

    // Options for fetch
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    }

    // Make fetch request
    fetch('/user/products/search', requestOptions)
    .then(async response => {
      // Remove the spinner 
      spinner.classList.add('d-none')
      spinner.classList.remove('d-block')

      if(response.ok) {
        return response.json()
      } else {
        const data = await response.json()
        throw new Error (data.message)
      }
    })
    .then(data => {
      if(data.products.docs[0]) {
        data.products.docs.forEach((product) => {
          eachProduct.innerHTML += `
            <div class="d-flex flex-column gap-1">
              <a href="/user/products/${product._id}">
                <div class="hover">
                  <div class="card">
                    <div class="d-flex align-items-center justify-content-center imageDiv">
                      <img src="/images/${product.images[0].filename}" class="productImg" alt="${product.name}">
                    </div>
                  </div>
                </div>
              </a>
              <div class="w-100 card cardBottom container">
                <div class="row p-1">
                  <div class="col-6 d-flex flex-column">
                    <h5> ${product.productName} </h5>
                    <h6>₹ ${product.price} </h6>
                  </div>
                  <div class="col-6 d-flex justify-content-end align-items-center wishListIcon gap-3">
                    <a class="wishlistHeart cursor-pointer" data-id="${product._id}">
                      ${data.wishlist && data.wishlist.includes(product._id)
                        ? `<i class="fa-solid fa-heart heart"></i>`
                        : `<i class="fa-regular fa-heart heart"></i>`
                      }
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `
        })
        buttonArea.innerHTML = ''
        for(let i = 1; i <= data.products.totalPages; i++) {
          buttonArea.innerHTML += `
          <button data-page="${i}" class="mt-3 ms-1 pageButton ${data.products.page === i ? 'currentPage' : ''} ">${i}</button>
        `
        }
      } else {
        buttonArea.innerHTML = ''
        eachProduct.innerHTML = `<div class="d-flex w-100 gap-4 justify-content-center align-items-center wishlistEmpty flex-column" style='margin-top: 200px;'>
        <h4 class="m-0">Sorry no results found, try something different.</h4>
        <img class="girl" src="/images/reusables/No product.png" alt="">
       
    </div>`
      }
      favourite()
      buttonFunction()
    })
    .catch(error => {
      console.error('Error in loading page:', error)
      errorMessage.textContent = `Error in loading page: ${error}`
    })
}

const categoryFunction = (button) => {
  button.addEventListener('click', () => {
    categorySelected = true
    productFunctionMain(button)
  })
}

const sortFunction = (button) => {
  button.addEventListener('click', () => {
  sortSelected = true
  productFunctionMain(button)
  })
}

const searchFunction = () => {
  searchSelected = true
  productFunctionMain()
}

sort.forEach(button => {
  sortFunction(button)
})

category.forEach(button => {
  categoryFunction(button)
})

searchButton.addEventListener('click', searchFunction)