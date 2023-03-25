const editButton = document.querySelector('.editBtn')
const input = document.querySelector('#categoryName')
const successMessage = document.querySelector('.successMessageAdd')
const errorMessage = document.querySelector('.errorMessage')
const categoryName = document.querySelector('#categoryName')
const subcategoryError = document.querySelector('.subcategoryError')
editButton.addEventListener('click', (event) => {
  event.preventDefault()
  errorMessage.textContent = ''
  successMessage.textContent = ''
  const isValid = validateForm()
  if (isValid) {
    const id = editButton.dataset.value
    const subcategoryName = input.value
    const requestBody = { id, subcategoryName }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }

    fetch('/admin/category/subcategory/add', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return response.json().then(function (data) {
            throw new Error(data.message)})
        }
      })
      .then((data) => {
        if (data) {
          successMessage.textContent = data.message
        }
      })
      .catch((error) => {
        console.error('Error in subcategory add:', error)
        errorMessage.textContent = `Error in subcategory add, ${error}`
      })
  } else {
    subcategoryError.textContent = 'Please enter a valid category name'
  }
})

const namePattern = /^[\w\d/.&,]+([\s-][\w\d/.&,]+)*$/

// Function to validate product name
const validateName = () => {
  if (!namePattern.test(categoryName.value)) {
    subcategoryError.textContent = 'Invalid product name'
    return false
  } else {
    subcategoryError.textContent = '';
    return true
  }
}

categoryName.addEventListener('input', validateName)

// Function to validate form
const validateForm = () => {
  // Check if all validation functions return true
  return validateName()
}
