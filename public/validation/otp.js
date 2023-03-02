const form = document.querySelector("form");
const otp = document.querySelector("#otp");
const displayError = document.querySelector("#error");
const otpError = document.getElementById("otp-error");

const otpPattern = /^\d{6}$/;

const otpFunction = () => {
  if (!otpPattern.test(otp.value)) {
    otpError.textContent = "OTP must be a number having 6 digits";
    return false;
  } else {
    otpError.textContent = "";
    return true;
  }
};

otp.addEventListener("input", otpFunction);

form.addEventListener("submit", (event) => {
  if (!otpFunction()) {
    event.preventDefault();
    displayError.textContent = "Please recheck";
  } else {
    form.submit();
  }
});