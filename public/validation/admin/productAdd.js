// Get form and input elements
const form = document.querySelector('form')
const productNameInput = document.querySelector('#productName')
const descriptionInput = document.querySelector('#productDescription')
const imageInput = document.querySelector('#productImage')
const productCategory = document.querySelector('#productCategory')
const subcategoryArea = document.querySelector('.subcategoryArea')
const errorArea = document.querySelector('.errorArea')

const fileError = document.getElementById('fileError')
const productNameError = document.getElementById('productNameError')
const descriptionError = document.getElementById('descriptionError')
const displayError = document.getElementById('error')

const namePattern = /^[\w\d/.&]+([\s-][\w\d/.]+)*$/
const descriptionPattern = /^[\s\S]{100,1000}$/

// Function to validate product name
const validateProductName = () => {
  if (!namePattern.test(productNameInput.value)) {
    productNameError.textContent = 'Invalid product name'
    return false
  } else {
    productNameError.textContent = ''
    return true
  }
}

// Function to validate description
const validateDescription = () => {
  if (!descriptionPattern.test(descriptionInput.value)) {
    descriptionError.textContent =
      'Product description should contain at least 100 characters and not more than 1000 characters'
    return false
  } else {
    descriptionError.textContent = ''
    return true
  }
}

// Function to validate files
const validateFiles = () => {
  if (imageInput.files.length !== 4) {
    fileError.textContent = 'We need exactly 4 images'
    return false
  } else {
    fileError.textContent = ''
    return true
  }
}

// Function to render previous images
function renderImages() {
  if (imageInput.files && imageInput.files.length > 0) {
    for (let i = 0; i < 4; i++) {
      const preview = document.getElementById('imagePreview' + i)
      preview.src = ''
    }
    for (let i = 0; i < 4; i++) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const img = new Image()
        img.src = e.target.result
        img.onload = function () {
          const preview = document.getElementById('imagePreview' + i)
          preview.innerHTML = ''
          preview.src = img.src
        }
      }
      reader.readAsDataURL(imageInput.files[i])
    }
  }
}

// Add event listeners to input elements
productNameInput.addEventListener('input', validateProductName)
descriptionInput.addEventListener('input', validateDescription)
imageInput.addEventListener('change', validateFiles)
imageInput.addEventListener('change', renderImages)

// Function to validate form
const validateForm = (event) => {
  const validationFunctions = [
    validateProductName,
    validateDescription,
    validateFiles,
  ]

  // Check if all validation functions return true
  const isValid = validationFunctions.every((validationFunction) =>
    validationFunction()
  )

  // If form is not valid, prevent submission and display error message
  if (!isValid) {
    displayError.textContent = 'Please fill in all required fields correctly.'
    event.preventDefault()
  }

  return isValid
}

form.addEventListener('submit', validateForm)

const subcategoryLoad = async () => {
  try {
    const categoryID = productCategory.value;
    const response = await fetch(`/admin/products/add/${categoryID}`);
    if (response.ok) {
      const data = await response.json();
      subcategoryArea.innerHTML = `
        <select name="productSubcategory" class="form-select" id="productSubcategory" aria-label="Product Subcategory">
          ${data.subcategories
            .map((subcategory) => `<option value='${subcategory._id}' >${subcategory.name}</option>`)
            .join('')}
        </select>`;
    } else {
      const data = await response.json();
      throw new Error(data.message);
    }
  } catch (error) {
    errorArea.textContent = `Error getting subcategories: ${error}`;
  }
}

productCategory.addEventListener('change', subcategoryLoad)
