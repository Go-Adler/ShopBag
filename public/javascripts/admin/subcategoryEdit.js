const editButton = document.querySelector(".editBtn")
const input = document.querySelector("#categoryName")
const successMessage = document.querySelector(".successMessage")
const errorMessage = document.querySelector(".errorMessage")

editButton.addEventListener("click", () => {
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
      console.error("Error in subcategory edit:", error)
      errorMessage.textContent = `Error in subcategory edit : ${error}`
    })
})


const categoryName = document.querySelector("#categoryName")
const categoryError = document.querySelector("#categoryError")

const namePattern = /^[\w\d/.&,]+([\s-][\w\d/.&,]+)*$/

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