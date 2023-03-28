document.getElementById('rzp-button1').onclick = function(){
    const requestBody = {
        amount: 100,
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
            "key": "rzp_test_ZVlm7mJKVkO7Pm", // Enter the Key ID generated from the Dashboard
            "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
            },
        };
        let rzp1 = new Razorpay(options)
        rzp1.open();
    })
    .catch(error => {
        console.log(error, 33);
    }) 
}