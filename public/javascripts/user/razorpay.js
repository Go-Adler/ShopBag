document.getElementById('rzp-button1').onclick = function (e) {
  e.preventDefault()
  const requestBody = {
    amount: 100,
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  }
  fetch('/user/checkout/razorpay', requestOptions)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      let options = {
        key: 'rzp_test_ZVlm7mJKVkO7Pm', // Enter the Key ID generated from the Dashboard
        amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        order_id: 'order_IluGWxBm9U8zJ8', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          alert(response.razorpay_payment_id)
          alert(response.razorpay_order_id)
          alert(response.razorpay_signature)
        },
      }
      let rzp1 = new Razorpay(options)
      rzp1.open()
    })
}
