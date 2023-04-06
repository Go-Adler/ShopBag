const trashes = document.querySelectorAll('.fa-trash')
const addressArea = document.querySelectorAll('.addressArea')
const couponButton = document.querySelector('#couponButton')
const couponInput = document.querySelector('#couponInput')
const totalButton = document.querySelector('.total')
const errorMessage = document.querySelector('.errorMessage')
const totalDisplay = document.querySelector('.totalDisplay')
const discountDisplay = document.querySelector('.discountDisplay')
const discountArea = document.querySelector('.discountDiv')
const walletArea = document.querySelector('.walletDiv')
const form = document.querySelector('form')
const cod = document.querySelector('.cod')
const wallet = document.querySelector('.wallet')
const upi = document.querySelector('.upi')
const codeArea = document.querySelector('.codeArea')
const totalInput = document.querySelector('.totalInput')
const walletInput = document.querySelector('.walletInput')
const walletBalance = document.querySelector('.walletBalance')
const walletDisplay = document.querySelector('.walletDisplay')
const walletApplied = document.querySelector('.walletApplied')
const choosePayments = document.querySelectorAll('.choosePayment')
const removeCoupon = document.querySelector('.removeCoupon')
const subtotal = document.querySelector('#subtotal')

let code = document.querySelector('.code')
let upiPayment = false
let walletChecked = false
let couponApplied = false

trashes.forEach((button, index) => {
  button.addEventListener('click', () => {
    const id  = button.dataset.id
    const requestBody = { id }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    }

    fetch('/user/profile/address/remove', requestOptions)
    .then(response => {
      if (response.ok) {
        addressArea[index].remove()
      } else {
        throw new Error ('Error removing address')
      }
    })
    .catch(error =>{
      console.log(`Error in removing address, ${error}`)
      errorMessage.textContent = `Error removing address, ${error}`
    })
  })
})

const uncheckWallet = (balance) =>  {
  cod.checked = true
  const total = totalButton.dataset.total
  totalInput.value = total
  walletApplied.value = 0
  walletBalance.value = balance
  totalDisplay.innerHTML = `₹ ${total}`
  walletArea.classList.add('d-none')
  walletArea.classList.remove('d-block')
  choosePayments.forEach(method => {
    method.classList.remove('d-none')
  })
}

const checkWallet = (balance) =>  {
    if (balance >= Number(totalButton.dataset.total)) {
      walletChecked = true
      walletBalance.value = balance - (totalInput.value)
      walletApplied.value = totalInput.value
      totalInput.value = 0
      totalDisplay.innerHTML = `₹ ${totalInput.value}`
      walletDisplay.innerHTML = `-₹ ${walletApplied.value}`
      walletArea.classList.remove('d-none')
      walletArea.classList.add('d-block')
      wallet.checked = true
      choosePayments.forEach(method => {
        method.classList.add('d-none')
      })
    } else {
      totalInput.value = totalInput.value - balance
      walletApplied.value = balance
      walletBalance.value = 0
      totalDisplay.innerHTML = `₹ ${totalInput.value}`
      walletDisplay.innerHTML = `-₹ ${balance}`
      walletArea.classList.remove('d-none')
      walletArea.classList.add('d-block')
    }
}

const checkWalletApplied = () => {
  let balance = Number(walletInput.dataset.balance)
  if (walletInput.checked) {
    checkWallet(balance)
  } else {
      walletChecked = false
      uncheckWallet(balance)
      if (couponApplied) couponButton.click()
  }
}

couponButton.addEventListener('click', () => {
  errorMessage.innerHTML = ''
  const total = subtotal.value 
  const couponCode = couponInput.value
  const requestBody = {
    total,
    couponCode
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  }
  fetch('/user/checkout/applyCoupon', requestOptions)
  .then(response => {
    if (response.ok) {
       return response.json() 
    }
  })
  .then(data => {
    if (data.invalid) {
      discountArea.classList.add('d-none')
      discountArea.classList.remove('d-block')
      discountDisplay.innerHTML = ''
      errorMessage.innerHTML = `${data.invalid}`
      code.remove()
      couponApplied = false
    } else if (data.discount) {
      removeCoupon.classList.remove('d-none')
      couponApplied = true
      codeArea.innerHTML = `<input type="text" class='code d-none' value='${couponCode}' name='code'></input>`
      code = document.querySelector('.code')
      const newTotal = Number(total) - Number(data.discount)
      totalInput.value = newTotal
      totalDisplay.innerHTML = `₹ ${newTotal}`
      discountArea.classList.remove('d-none')
      discountArea.classList.add('d-block')
      discountDisplay.innerHTML = `-₹ ${data.discount}`
      if(walletChecked) walletInput.checked = true
    }
  })
})

upi.addEventListener('change', () => {
  form.setAttribute('action', "checkout/razorpayOnlineSuccess")
  upiPayment = true
})

cod.addEventListener('change', () => {
  form.setAttribute("action", '')
  upiPayment = false
})


form.addEventListener('submit', (e) => {
   if (upiPayment) {
    e.preventDefault()
    const amount = totalInput.value
    const requestBody = {
        amount,
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    }
    fetch('/user/checkout/razorpayOnline', requestOptions)
    .then(response => {
         return response.json()
    })
    .then(data => {
        console.log(data, 20);
        let options = {
            "key": "rzp_test_ZVlm7mJKVkO7Pm",
            "amount": data.amount,
            "currency": "INR",
            "order_id": data.id,
            "handler": function (){
                form.submit()
            },
        };
        let rzp1 = new Razorpay(options)
        rzp1.open();

    })
    .catch(error => {
        console.log(`Error in razorpay ${error}`);
    }) 
   } else {
    form.submit()
   }
})

walletInput.addEventListener('change', () => {
  checkWalletApplied()
})

removeCoupon.addEventListener('click', () => {
  removeCoupon.classList.add('d-none')
})