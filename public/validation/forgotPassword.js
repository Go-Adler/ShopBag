const form = document.querySelector("form")
const email = document.querySelector("#email")
const displayError = document.querySelector("#error")

const emailError = document.getElementById('emailError')

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


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

email.addEventListener('input', () => {
    displayError.textContent = ''
    if (email.value.length > 5) {
        emailFunction()
    }
})

email.addEventListener('blur', emailFunction)

let isFormValid = false

const formFunctions = [
    emailFunction
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