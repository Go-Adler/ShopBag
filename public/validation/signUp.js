const form = document.querySelector('form')
const nameUser = document.querySelector('#name')
const email = document.querySelector('#email')
const phoneNumber = document.querySelector('#phone')
const password = document.querySelector('#password')
const passwordConfirmation = document.querySelector('#password_confirmation')
const displayError = document.querySelector('#error')
const nameError = document.getElementById('name-error')
const emailError = document.getElementById('email-error')
const phoneNumberError = document.getElementById('phoneNumber-error')
const passwordError = document.getElementById('password-error')
const passwordConfirmationError = document.getElementById(
  'confirm-password-error'
)

const namePattern = /^[A-Z][a-z]+(\s[A-Z][a-z]{0,25}){0,3}$/
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneNumberPattern = /^\d{10}$/
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#\$%\^&\*])[a-zA-Z\d!-@#\$%\^&\*]{8,20}$/

let passwordFirstInput = false

const nameFunction = () => {
  if (!namePattern.test(nameUser.value)) {
    nameError.textContent = 'Invalid name'
    return false
  } else {
    nameError.textContent = ''
    return true
  }
}
const emailFunction = () => {
  if (!emailPattern.test(email.value)) {
    emailError.textContent = 'Invalid email'
    return false
  } else {
    emailError.textContent = ''
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

const passwordFunction = () => {
  if (!passwordPattern.test(password.value)) {
    passwordError.textContent = 'Not a strong password'
    return false
  } else {
    passwordError.textContent = ''
    return true
  }
}

const passwordConfirmationFunction = () => {
  passwordFirstInput = true
  if (password.value !== passwordConfirmation.value) {
    passwordConfirmationError.textContent = 'Passwords not matching'
    return false
  } else {
    passwordConfirmationError.textContent = ''
    return true
  }
}

nameUser.addEventListener('input', nameFunction)
email.addEventListener('input', emailFunction)
phoneNumber.addEventListener('blur', phoneNumberFunction)
phoneNumber.addEventListener('input', () => {
  if (phoneNumber.value.length > 5) {
    phoneNumberFunction()
  }
})
password.addEventListener('input', passwordFunction)
passwordConfirmation.addEventListener('input', passwordConfirmationFunction)
password.addEventListener('input', () => {
  if (passwordFirstInput) {
    passwordConfirmationFunction()
  }
})

let isFormValid = false

const formFunctions = [
  nameFunction,
  emailFunction,
  phoneNumberFunction,
  passwordFunction,
  passwordConfirmationFunction,
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
