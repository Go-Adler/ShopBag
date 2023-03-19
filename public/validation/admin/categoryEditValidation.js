const form = document.querySelector("form")
const categoryName = document.querySelector("#categoryName")
const categoryError = document.querySelector("#categoryError")

const namePattern = /^[\w\d/.&]+([\s-][\w\d/.]+)*$/

// Function to validate product name
const validateName = () => {
  console.log("hi")
  if (!namePattern.test(categoryName.value)) {
    categoryError.textContent = "Invalid product name"
    return false
  } else {
    categoryError.textContent = ""
    return true
  }
}

categoryName.addEventListener("input", validateName)

// Function to validate form
const validateForm = (event) => {
  console.log("entering validate")
  // Check if all validation functions return true
  const isValid = validateName()

  // If form is not valid, prevent submission and display error message
  if (!isValid) {
    event.preventDefault()

    categoryError.textContent = "Please enter a valid category name"
  }

  return isValid
}

form.addEventListener("submit", validateForm)
