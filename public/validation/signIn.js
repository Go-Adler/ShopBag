const form = document.querySelector("form")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const displayError = document.querySelector("#error")

const emailError = document.getElementById('email-error')
const passwordError = document.getElementById('password-error')

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#\$%\^&\*])[a-zA-Z\d!-@#\$%\^&\*]{8,20}$/

const emailFunction = () => {
    displayError.textContent = ''
    if (!emailPattern.test(email.value)) {
      emailError.textContent = 'Invalid email'
      return false
    } else {
      emailError.textContent = ''
      return true
    }
}

const passwordFunction =  () => {
    displayError.textContent = ''
    if(!passwordPattern.test(password.value)){
      passwordError.textContent = 'The password does not seem to be correct'
      return false
    } else {
      passwordError.textContent = ''
      return true
    }
}

email.addEventListener('input', () => {
    displayError.textContent = ''
    if (email.value.length > 5) {
        emailFunction()
    }
})
email.addEventListener('blur', emailFunction)
password.addEventListener('input', passwordFunction)

let isFormValid = false

const formFunctions = [
    emailFunction,
    passwordFunction
]

form.addEventListener("submit", (event) => {
    if(formFunctions.every(fn => fn())){
        isFormValid = true
    }
    if(!isFormValid) {
        event.preventDefault()
        displayError.textContent= 'Please check everything filled is correct.'
    } else {
        form.submit()
    }
})