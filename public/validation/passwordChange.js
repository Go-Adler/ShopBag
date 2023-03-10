const form = document.querySelector("form");
const password = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#password_confirmation");
const displayError = document.querySelector("#error");

const passwordError = document.getElementById("password-error");
const passwordConfirmationError = document.getElementById(
  "confirm-password-error"
);

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#\$%\^&\*])[a-zA-Z\d!-@#\$%\^&\*]{8,20}$/;

let passwordFirstInput = false;

const passwordFunction = () => {
  if (!passwordPattern.test(password.value)) {
    passwordError.textContent = "Not a strong password";
    return false;
  } else {
    passwordError.textContent = "";
    return true;
  }
};
const passwordConfirmationFunction = () => {
  passwordFirstInput = true;
  if (password.value !== passwordConfirmation.value) {
    passwordConfirmationError.textContent = "Passwords not matching";
    return false;
  } else {
    passwordConfirmationError.textContent = "";
    return true;
  }
};
password.addEventListener("input", passwordFunction);
passwordConfirmation.addEventListener("input", passwordConfirmationFunction);
password.addEventListener("input", () => {
  if (passwordFirstInput) {
    passwordConfirmationFunction();
  }
});

let isFormValid = false;

const formFunctions = [
  passwordFunction,
  passwordConfirmationFunction,
];

form.addEventListener("submit", (event) => {
  if (formFunctions.every((fn) => fn())) {
    isFormValid = true;
  }
  if (!isFormValid) {
    event.preventDefault();
    displayError.textContent = "Please check everything filled is correct.";
  } else {
    form.submit();
  }
});