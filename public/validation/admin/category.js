const categoryForm = document.querySelector("#categoryForm")
const categoryNameInput = document.querySelector("#categoryName")
const subcategoryForm = document.querySelector("#subcategoryForm")
const subcategoryNameInput = document.querySelector("#subcategoryName")
const categoryError = document.querySelector("#categoryError")
const subcategoryError = document.querySelector("#subcategoryError")

const categoryPattern = /^[a-zA-Z]+$/

// Function to validate category name
const validateCategoryName = () => {
  if (!categoryPattern.test(categoryNameInput.value)) {
    categoryError.textContent = "Invalid category name"
    return false
  } else {
    categoryError.textContent = ""
    return true
  }
}


// Function to validate subcategory name
const validateSubcategoryName = () => {
  if (!categoryPattern.test(subcategoryNameInput.value)) {
    subcategoryError.textContent = "Invalid subcategory name"
    return false
  } else {
    subcategoryError.textContent = ""
    return true
  }
}

// Add event listners to input elements
categoryNameInput.addEventListener("input", validateCategoryName)
subcategoryNameInput.addEventListener("input", validateSubcategoryName)


// Function to validate form
const validateForm = (event) => {
  const validationFunctions = [ validateCategoryName ]

  // Check if all validation functions return true
  const isValid = validationFunctions.every((validationFunction) =>
    validationFunction()
  )

  // If form is not valid, prevent submission and display error message
  if (!isValid) {
    event.preventDefault()
  }

  return isValid
}

categoryForm.addEventListener("submit", validateForm)
