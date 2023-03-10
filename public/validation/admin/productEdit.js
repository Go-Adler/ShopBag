// Get form and input elements
const form = document.querySelector("form")
const productNameInput = document.querySelector("#productName")
const descriptionInput = document.querySelector("#productDescription")
const imageInput = document.querySelector("#productImage")
const checkboxes = document.querySelectorAll('.form-check-input');



const fileError = document.getElementById("fileError")
const productNameError = document.getElementById("productNameError")
const descriptionError = document.getElementById("descriptionError")
const displayError = document.getElementById("error")

const namePattern = /^(\w+\s)*\w+$/
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

// Add event listeners to input elements
productNameInput.addEventListener("input", validateProductName)
descriptionInput.addEventListener("input", validateDescription)

let numChecked = 0;
let numFiles = 0;
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        numChecked++;
      } else {
        numChecked--;
      }
      updateFileInput();
    });
});

imageInput.addEventListener('change', () => {
    numFiles = imageInput.files.length;
    updateFileInput();
  });
  
function updateFileInput() {
    if (numChecked + numFiles === 4) {
      fileError.textContent = ''
      return true
    } else {
      fileError.textContent = 'Total images choose from files and preserved should be exactly 4'
      return false
    }
}

// Define form validation function
const validateForm = (event) => {
  const validationFunctions = [ updateFileInput, validateProductName, validateDescription ]

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


imageInput.addEventListener("change", validateImage, )

function validateImage() {
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

form.addEventListener("submit", validateForm)


