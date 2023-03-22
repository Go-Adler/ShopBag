console.log('jho');
const form = document.querySelector("form");
const nameUser = document.querySelector("#name");
const phoneNumber = document.querySelector("#phone");
const pincode = document.querySelector("#pincode");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const state = document.querySelector("#state");

const nameError = document.querySelector("#name-error");
const phoneNumberError = document.querySelector("#number-error");
const pincodeError = document.querySelector("#pincode-error");
const localityError = document.querySelector("#locality-error");
const addressError = document.querySelector("#address-error");
const cityError = document.querySelector("#city-error");
const stateError = document.querySelector("#state-error");
const error = document.querySelector("#error")

const namePattern = /^[A-Z][a-z]+(\s[A-Z][a-z]{0,25}){0,3}$/;
const phoneNumberPattern = /^\d{10}$/;
const otherPattern =  /^[A-Z][a-z]{0,25}$/;
const pincodePattern = /^\d{6}$/
const addressPattern = /^[\s\S]{50,1000}$/



const nameFunction = () => {
  if (!namePattern.test(nameUser.value)) {
    nameError.textContent = "Invalid name";
    return false;
  } else {
    nameError.textContent = "";
    return true;
  }
};

const phoneNumberFunction = () => {
  if (!phoneNumberPattern.test(phoneNumber.value)) {
    phoneNumberError.textContent = "Invalid phone number";
    return false;
  } else {
    phoneNumberError.textContent = "";
    return true;
  }
};

const stateFunction = () => {
  if (!otherPattern.test(state.value)) {
    stateError.textContent = "Invalid state";
    return false;
  } else {
    stateError.textContent = "";
    return true;
  }
};

const cityFunction = () => {
  if (!otherPattern.test(city.value)) {
    cityError.textContent = "Invalid city";
    return false;
  } else {
    cityError.textContent = "";
    return true;
  }
};

const pincodeFunction = () => {
  if (!pincodePattern.test(pincode.value)) {
    pincodeError.textContent = "Invalid pincode";
    return false;
  } else {
    pincodeError.textContent = "";
    return true;
  }
};

const addressFunction = () => {
  if (!addressPattern.test(address.value)) {
    addressError.textContent = "Invalid address";
    return false;
  } else {
    addressError.textContent = "";
    return true;
  }
};

nameUser.addEventListener("input", nameFunction)
phoneNumber.addEventListener("input", phoneNumberFunction)
pincode.addEventListener("input", pincodeFunction)
address.addEventListener("input", addressFunction)
address.addEventListener("input", addressFunction)
city.addEventListener("input", cityFunction)
state.addEventListener("input", stateFunction)

let isFormValid = false;

const formFunctions = [
  nameFunction,
  phoneNumberFunction,
  pincodeFunction,
  addressFunction,
  cityFunction,
  stateFunction
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

