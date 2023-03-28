const button = document.querySelector('#rzp-button1')

button.addEventListener('click', () => {
    const amount = button.dataset.total
    console.log(amount, 5);
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
            "handler": function (response){
            },
        };
        let rzp1 = new Razorpay(options)
        rzp1.open();
        window.location.href = '/user/checkout/razorpayOnline'
    })
    .catch(error => {
        console.log(error, 33);
    }) 
})