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


let countDown = 30;

let timer = document.getElementById("timer");
let intervalId = setInterval(() => {
  countDown--; 
  let minutes = Math.floor(countDown / 60);
  let seconds = countDown % 60;
  timer.innerHTML = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; // format the timer
  if (countDown === 0) {
    document.getElementById('resend').classList.remove('d-none');
    document.getElementById('resend').classList.add('d-flex');
    document.getElementById('timer').classList.add('d-none');
    document.getElementById('timerArea').classList.remove('d-flex');
    document.getElementById('timerArea').classList.add('d-none');
  }
}, 1000);
