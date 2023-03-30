const trashes = document.querySelectorAll('.fa-trash')
const addressArea = document.querySelectorAll('.addressArea')
const couponButton = document.querySelector('#couponButton')
const couponInput = document.querySelector('#couponInput')
const totalButton = document.querySelector('.total')
const errorMessage = document.querySelector('.errorMessage')
const totalDisplay = document.querySelector('.totalDisplay')
const discountDisplay = document.querySelector('.discountDisplay')
const discountArea = document.querySelector('.discountDiv')
const form = document.querySelector('form')
const cod = document.querySelector('.cod')
const upi = document.querySelector('.upi')
let code = document.querySelector('.code')
const codeArea = document.querySelector('.codeArea')
const totalInput = document.querySelector('.totalInput')
let upiPayment = false

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

couponButton.addEventListener('click', () => {
  errorMessage.innerHTML = ''
  const { total } = totalButton.dataset
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
    } else if (data.discount) {
      codeArea.innerHTML = `<input type="text" class='code d-none' value='${couponCode}' name='code'></input>`
      code = document.querySelector('.code')
      const newTotal = total - data.discount
      totalInput.value = newTotal
      totalDisplay.innerHTML = `₹ ${newTotal}`
      discountArea.classList.remove('d-none')
      discountArea.classList.add('d-block')
      discountDisplay.innerHTML = `-₹ ${data.discount}`
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