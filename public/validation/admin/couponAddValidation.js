const form = document.querySelector("form")
const code = document.querySelector("#code")
const codeError = document.querySelector("#codeError")

const namePattern = /^[\w\d/.&,]+([\s-][\w\d/.&,]+)*$/
const codePattern = /^[A-Z]{0,15}$/

isFormValid = false

// Function to validate coupon code
const validateCode = () => {
  if (!codePattern.test(code.value)) {
    codeError.textContent = "Invalid code"
    return false
  } else {
    codeError.textContent = ""
    return true
  }
}

// Event listener of code input
code.addEventListener("click", validateCode)

const formFunctions = [
];

form.addEventListener("submit", (event) => {
  if (formFunctions.every((fn) => fn())) {
    isFormValid = true;
  }
  if (!isFormValid) {
    event.preventDefault();
    error.textContent = "Please check everything filled is correct.";
  } else {
    form.submit();
  }
});