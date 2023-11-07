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
    spinner.classList.remove('hidden')
    spinner.classList.add('flex')
    buttonArea.classList.add('hidden')

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
      spinner.classList.add('hidden')
      spinner.classList.remove('block')
      buttonArea.classList.remove('hidden')

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
          <div class="card relative -z-10">
          <div class="">
              <a href="/user/products/${product._id}" class="flex justify-center p-4 items-center">
                  <img src="${product.images[0].path}" class="" alt="${product.name}">
                  <span class='d-flex align-items-center absolute text-red-700 text-xs bottom-1'>
                      ${product.stock <= 0 ? '( Out of stock )' : '' }
                  </span>
              </a>
          </div>

          <div class="card cardBottom flex p-2 justify-between">
              <div class="">
                  <span class='flex items-center gap-1'>
                      <h5 class='m-0'> ${product.productName}</h5>
                  </span>
                  <h6 class="font-medium">₹${product.price} </h6>
              </div>
              
              <div class="wishListIcon flex items-center">
                  <a class="wishlistHeart cursor-pointer" data-id="${product._id}">
                      ${ (data.wishlist.includes(product._id))
                         ? '<i class="fa-solid fa-heart heart"></i>'
                         : '<i class="fa-regular fa-heart heart"></i>'
                      }
                  </a>
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
        <img class="girl" src="https://res.cloudinary.com/dprjb18ng/image/upload/v1681737615/reusables/No_product_peq50f.png" alt="">
       
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