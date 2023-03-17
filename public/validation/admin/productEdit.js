
  // Get form and input elements
const form = document.querySelector("form")
const productNameInput = document.querySelector("#productName")
const descriptionInput = document.querySelector("#productDescription")
const checkboxes = document.querySelectorAll(".form-check-input")
const imagePreview  = document.querySelectorAll(".imagePreview")
const inputImage = document.querySelectorAll(".inputImage")
const checkBox = document.querySelectorAll(".form-check-input")

const fileError = document.getElementById("fileError")
const fileNumberError = document.getElementById("fileNumberError")
const productNameError = document.getElementById("productNameError")
const descriptionError = document.getElementById("descriptionError")
const displayError = document.getElementById("error")

const namePattern = /^[\w\d/.]+([\s-][\w\d/.]+)*$/
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

// Function to validate files
const validateFilesNumber = () => {
  if (imageInput.files.length > 4) {
    fileNumberError.textContent = "We cannot add more than 4 images."
    return false
  } else {
    fileNumberError.textContent = ""
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

// Add event listeners to input elements
productNameInput.addEventListener("input", validateProductName)
descriptionInput.addEventListener("input", validateDescription)

imagePreview.forEach((image) => {
  image.addEventListener("click", () => {
    console.log('preview click works');
    const index = image.getAttribute("data-index")
    inputImage[index].click()
  })
})

inputImage.forEach(input => {
  input.addEventListener('input', () => {
    const index = input.getAttribute('data-index')
    inputImage[index].click()
    checkBox[index].checked = true
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target.result
      img.onload = function () {
      imagePreview[index].src = img.src
      }
    }
    reader.readAsDataURL(inputImage[index].files[0])
  })
})

let numChecked = 0
let numFiles = 0
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      numChecked++
    } else {
      numChecked--
    }
    updateFileInput()
  })
})

imageInput.addEventListener("change", () => {
  numFiles = imageInput.files.length
  updateFileInput()
})

function updateFileInput() {
  if (numChecked === numFiles) {
    fileError.textContent = ""
    return true
  } else {
    fileError.textContent =
      "Please ensure that the number of images selected for deletion matches the number of images uploading from files"
    return false
  }
}

// Define form validation function
const validateForm = (event) => {
  event.preventDefault()
  const validationFunctions = [
    updateFileInput,
    validateProductName,
    validateDescription,
    validateFilesNumber,
  ]

  // Check if all validation functions return true
  const isValid = validationFunctions.every((validationFunction) =>
    validationFunction()
  )
  // If form is not valid, prevent submission and display error message
  if (!isValid) {
    displayError.textContent = `Please fill in all required fields correctly.`
  }

  return isValid
}

form.addEventListener("submit", (event) => {
  if (validateForm(event)) {
    form.submit()
  }
})
