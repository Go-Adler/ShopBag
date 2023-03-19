const editButton = document.querySelector(".editBtn")
const input = document.querySelector("#categoryName")
const successMessage = document.querySelector(".successMessage")
const errorMessage = document.querySelector(".errorMessage")

editButton.addEventListener("click", () => {
  const isValid = validateForm()

  if (isValid) {
    const id = editButton.dataset.value
    const subcategoryName = input.value
    const requestBody = { id, subcategoryName }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody)
    }

    fetch("/admin/category/subcategory/edit", requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    })
    .then((data) => {
      if(data.success) {
        successMessage.textContent = data.message
      }
    })
    .catch((error) => {
      errorMessage.textContent = error.message
    })
  } else {
    categoryError.textContent = "Please enter a valid category name"
  }
})


const categoryName = document.querySelector("#categoryName")
const categoryError = document.querySelector("#categoryError")

const namePattern = /^[\w\d/.&]+([\s-][\w\d/.]+)*$/

// Function to validate product name
const validateName = () => {
  if (!namePattern.test(categoryName.value)) {
    categoryError.textContent = "Invalid product name"
    return false
  } else {
    categoryError.textContent = ""
    console.log('reaching empty');
    return true
  }
}

categoryName.addEventListener("input", validateName)

// Function to validate form
const validateForm = () => {
  console.log("entering validate")
  // Check if all validation functions return true
  const isValid = validateName()

  return isValid ? true : false
}

