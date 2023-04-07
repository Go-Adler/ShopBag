const form = document.querySelector('form')
const nameUser = document.querySelector('#name')
const phoneNumber = document.querySelector('#phone')

const displayError = document.querySelector('#error')
const nameError = document.getElementById('name-error')
const phoneNumberError = document.getElementById('phoneNumber-error')

const namePattern = /^[A-Z][a-z]+(\s[A-Z][a-z]{0,25}){0,3}$/
const phoneNumberPattern = /^\d{10}$/

const nameFunction = () => {
  if (!namePattern.test(nameUser.value)) {
    nameError.textContent = 'Invalid name'
    return false
  } else {
    nameError.textContent = ''
    return true
  }
}

const phoneNumberFunction = () => {
  if (!phoneNumberPattern.test(phoneNumber.value)) {
    phoneNumberError.textContent = 'Invalid phone number'
    return false
  } else {
    phoneNumberError.textContent = ''
    return true
  }
}

nameUser.addEventListener('input', nameFunction)
phoneNumber.addEventListener('blur', phoneNumberFunction)
phoneNumber.addEventListener('input', () => {
  if (phoneNumber.value.length > 5) {
    phoneNumberFunction()
  }
})

let isFormValid = false


const formFunctions = [
  nameFunction,
  phoneNumberFunction,
]

form.addEventListener('submit', (event) => {
  if (formFunctions.every((fn) => fn())) {
    isFormValid = true
  }
  if (!isFormValid) {
    event.preventDefault()
    displayError.textContent = 'Please check everything filled is correct.'
  } else {
    form.submit()
  }
})
