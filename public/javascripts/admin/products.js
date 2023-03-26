const buttonArea = document.querySelector(".buttonArea")
const pageButtons = document.querySelectorAll(".pageButton")
const eachhProduct = document.querySelector(".eachhProduct")
const spinner = document.querySelector(".spinnerDiv")
const errorMessage = document.querySelector(".errorMessage")

function disableProduct(productId) {
  fetch("products/disable", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "products"
      } else {
        console.error("Error disabling product")
      }
    })
    .catch((error) => {
      console.error("Error disabling user:", error)
      errorMessage.textContent = `Error in disable user: ${error}`
    })
}

function enableProduct(productId) {
  fetch("products/enable", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "products"
      } else {
        console.error("Error enabling product")
      }
    })
    .catch((error) => {
      console.error("Error user enable:", error)
      errorMessage.textContent = `Error in user enable: ${error}`
    })
}

function editProduct(productId) {
  fetch("products/edit", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "products"
      } else {
        console.error("Error enabling product")
      }
    })
    .catch((error) => {
      console.error("Error in porduct edit:", error)
      errorMessage.textContent = `Error in product edit: ${error}`
    })
}

pageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    pageButtons.forEach(button => {
      button.classList.remove('currentPage')
    })
    button.classList.add('currentPage')
    eachhProduct.innerHTML = ""
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

    fetch("/admin/products", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })

      .then((data) => {
        spinner.classList.add("d-none")
        spinner.classList.remove("d-block")
        eachhProduct.innerHTML = ""
        data.products.docs.forEach((product) => {
          eachhProduct.innerHTML += `
          <tr>
            <td class="text-right">${product.productName}</td>
            <td class="text-right">${product.price}</td>
            <td class="text-right">${product.stock}</td>
            <td class="text-center">
              ${
                product.isDisabled
                  ? '<span class="badge active badge-success">Enabled</span>'
                  : '<span class="badge inactive badge-danger">Disabled</span>'
              }
            </td>
            <td class="text-center">
              <a href="products/edit/${product._id}">
                <button type="button" class="btn btn-sm mr-2 editBtn" onclick="editProduct('${product._id}')">Edit</button>
              </a>
              ${
                product.isDisabled
                  ? `<button
                      type="button"
                      class="btn btn-sm enableBtn"
                      onclick="enableProduct('${product._id}')"
                    >
                      Enable
                    </button>`
                  : `<button
                      type="button"
                      class="btn btn-sm disableBtn"
                      onclick="disableProduct('${product._id}')"
                    >
                      Disable
                    </button>`
              } 
            </td>
          </tr>
        `;
        })
      })
  })
})