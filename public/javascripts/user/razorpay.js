const button = document.querySelector('#rzp-button1')
const form = document.querySelector('form')

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
                // window.location.href = 'razorpayOnline'
                form.submit()
            },
        };
        let rzp1 = new Razorpay(options)
        rzp1.open();

    })
    .catch(error => {
        console.log(error, 33);
    }) 
})