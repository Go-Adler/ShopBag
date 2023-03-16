// Get form and input elements
const form = document.querySelector("form")
const productNameInput = document.querySelector("#productName")
const descriptionInput = document.querySelector("#productDescription")
const imageInput = document.querySelector("#productImage")

const fileError = document.getElementById("fileError")
const productNameError = document.getElementById("productNameError")
const descriptionError = document.getElementById("descriptionError")
const displayError = document.getElementById("error")

const namePattern = /^[\w\d/.]+([\s-][\w\d/.]+)*$/;
const descriptionPattern = /^[\s\S]{100,1000}$/

// Function to validate product name
const validateProductName = () => {
  if (!namePattern.test(productNameInput.value)) {
    productNameError.textContent = "Invalid product name"
    return false
  } else {
    productNameError.textContent = ""
    return true
  }
}

// Function to validate description
const validateDescription = () => {
  if (!descriptionPattern.test(descriptionInput.value)) {
    descriptionError.textContent =
      "Product description should contain at least 100 characters and not more than 1000 characters"
    return false
  } else {
    descriptionError.textContent = ""
    return true
  }
}

// Function to validate files
const validateFiles = () => {
  if (imageInput.files.length !== 4) {
    fileError.textContent =
      "We need exactly 4 images"
      return false 
  } else {
    fileError.textContent = "";
    return true
  }
}

// Function to render previous images
function renderImages() {
  if (imageInput.files && imageInput.files.length > 0) {
    for (let i = 0; i < 4; i++) {
      const preview = document.getElementById("imagePreview"+i)
      preview.src = ''
    }
    for (let i = 0; i < 4; i++) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const img = new Image()
        img.src = e.target.result
        img.onload = function () {
        const preview = document.getElementById("imagePreview"+i)
        preview.innerHTML = ""
        console.log(i, 'preview img src', img.src);
        preview.src = img.src
        }
      }
      reader.readAsDataURL(imageInput.files[i])
    }
  }
}

// Add event listeners to input elements
productNameInput.addEventListener("input", validateProductName)
descriptionInput.addEventListener("input", validateDescription)
imageInput.addEventListener("change", validateFiles)
imageInput.addEventListener("change", renderImages )


// Function to validate form
const validateForm = (event) => {
  const validationFunctions = [validateProductName, validateDescription, validateFiles]

  // Check if all validation functions return true
  const isValid = validationFunctions.every((validationFunction) =>
    validationFunction()
  )

  // If form is not valid, prevent submission and display error message
  if (!isValid) {
    displayError.textContent = "Please fill in all required fields correctly."
    event.preventDefault()
  }

  return isValid
}

form.addEventListener("submit", validateForm)


