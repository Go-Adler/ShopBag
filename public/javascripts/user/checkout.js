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
    if (response.ok) return response.json()
  })
  .then(data => {
    if (data.invalid) {
      errorMessage.innerHTML = `${data.invalid}`
    } else if (data.discount) {
      const newTotal = total - data.discount
      totalDisplay.innerHTML = `₹ ${newTotal}`
      discountArea.classList.remove('d-none')
      discountArea.classList.add('d-block')
      discountDisplay.innerHTML = `-₹ ${data.discount}`
    }
  })
})

upi.addEventListener('change', () => {
  console.log('clicked');
  form.setAttribute('action', '/user/checkout/razorpay')
})

cod.addEventListener('change', () => {
  console.log('clicked cod');
  form.setAttribute("action", '')
})