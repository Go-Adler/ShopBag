const incrementButtons = document.querySelectorAll('.buttonIncrement');
const decrementButtons = document.querySelectorAll('.buttonDecrement');
const quantityInputs = document.querySelectorAll('.quantity-input');
const totalElements = document.querySelectorAll('.total');
const productID = document.querySelectorAll(".id")
const totalSum = document.querySelector(".totalQuantity")
const errorMessage = document.querySelector(".errorMessage")
const checkoutButtonLink = document.querySelector('.checkoutButtonLink')
const stocks = document.querySelectorAll('.stock')
const error = document.querySelector('.error')
const maximumLimit = document.querySelectorAll('.maximumLimit')

// Find sum
let sum = 0;
for (let element of totalElements) {
  // convert text content to a number and add it to sum
  sum += Number(element.textContent);
  totalSum.textContent = sum
}

const updateQuantity = () => {
  quantityInputs.forEach((item, index) => {
    const newQuantity = item.value
    const productId = productID[index].value
  fetch('cart/update-quantity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      quantity: newQuantity,
      product: productId
    })
  })
  .catch(error => {
    console.error("Error in quantity update:", error)
    errorMessage.textContent = `Error in quantity increment: ${error}`
  });
  })
}

updateQuantity()

// Increment quantity
incrementButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the index of the product
    const index = button.getAttribute('data-index');
    const max = quantityInputs[index].dataset.max
    console.log(max, 49);

    // Get the current quantity and total price for the product
    const currentQuantity = parseInt(quantityInputs[index].value);
    const currentTotal = parseFloat(totalElements[index].textContent);
    const productId = productID[index].value
    let newQuantity
    // Get the new quantity from the quantity input field
    if(currentQuantity < max) {
      newQuantity = currentQuantity + 1;
    } else {
      maximumLimit[index].classList.add('d-flex')
      maximumLimit[index].classList.remove('d-none')
      setTimeout(() => {
        maximumLimit[index].classList.remove('d-flex')
        maximumLimit[index].classList.add('d-none')
      }, 1500)

      newQuantity = max
    }
    // Calculate the new total price
    const newTotal = currentTotal / currentQuantity * newQuantity;

    console.log(newQuantity, productID, 65);

    // Make an AJAX request to the server to update the quantity and total price
    fetch('cart/increment-quantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quantity: newQuantity,
        product: productId
      })
    })
    .then(response => {
      if (response.ok) {
        // Update the quantity and total price in the UI
        quantityInputs[index].value = newQuantity;
        totalElements[index].textContent = newTotal;
        // Find sum
        sum = 0
        for (let element of totalElements) {
         sum += Number(element.textContent);
        }
        totalSum.textContent = sum
      }
    })
    .catch(error => {
      console.error("Error in quantity increment:", error)
      errorMessage.textContent = `Error in quantity increment: ${error}`
    });
  });
});

// Decrement quantity
decrementButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the index of the product
    const index = button.getAttribute('data-index');

    // Get the current quantity and total price for the product
    const currentQuantity = parseInt(quantityInputs[index].value);
    const currentTotal = parseFloat(totalElements[index].textContent);
    const productId = productID[index].value

    // Get the new quantity from the quantity input field
    let newQuantity = currentQuantity - 1;
    if(newQuantity < 1){
      newQuantity = 1
    }
    // Calculate the new total price
    const newTotal = currentTotal / currentQuantity * newQuantity;

    // Make an AJAX request to the server to update the quantity and total price
    fetch('cart/decrement-quantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quantity: newQuantity,
        product: productId
      })
    })
    .then(response => {
      if (response.ok) {
        // Update the quantity and total price in the UI
        quantityInputs[index].value = newQuantity;
        totalElements[index].textContent = newTotal;
        // Find sum
        sum = 0
        for (let element of totalElements) {
         sum += Number(element.textContent);
        }
        totalSum.textContent = sum

      }
    })
    .catch(error => {
      console.error("Error in quantity decrement:", error)
      errorMessage.textContent = `Error in quantity decrement: ${error}`
    });
  });
});

// Increment quantity
quantityInputs.forEach(input => {
  input.addEventListener('input', () => {
    // Get the index of the product
    const index = input.getAttribute('data-index');

    // Get the current quantity and total price for the product
    const currentQuantity = parseInt(quantityInputs[index].value);
    const currentTotal = parseFloat(totalElements[index].textContent);
    const productId = productID[index].value

    // Get the new quantity from the quantity input field
    const newQuantity = input.value;
    // Calculate the new total price
    const newTotal = currentTotal / currentQuantity * newQuantity;

    // Make an AJAX request to the server to update the quantity and total price
    fetch('cart/increment-quantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quantity: newQuantity,
        product: productId
      })
    })
    .then(response => {
      if (response.ok) {
        // Update the quantity and total price in the UI
        quantityInputs[index].value = newQuantity;
        totalElements[index].textContent = newTotal;
        // Find sum
        sum = 0
        for (let element of totalElements) {
         sum += Number(element.textContent);
        }
        totalSum.textContent = sum
      }
    })
    .catch(error => { 
      console.error("Error in quantity input:", error)
      errorMessage.textContent = `Error in quantity input: ${error}`
    });
  });
});


checkoutButtonLink.addEventListener('click', (e) => {
  let noStockItemPresent = false
  e.preventDefault()
  stocks.forEach(button => {
    if (button.classList.contains('stock')) {
      noStockItemPresent = true
    } 
  })
  if (noStockItemPresent) {
    error.innerHTML = 'Your cart contains no stock item, please remove it.'
  } else {
    window.location.href = '/user/checkout'
  }
})

