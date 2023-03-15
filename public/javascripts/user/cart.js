const incrementButtons = document.querySelectorAll('.buttonInc');
const decrementButtons = document.querySelectorAll('.buttonDec');
const quantityInputs = document.querySelectorAll('.quantity-input');
const totalElements = document.querySelectorAll('.total');
const productID = document.querySelectorAll(".id")
const totalSum = document.querySelector(".totalQuantity")


// Find sum
let sum = 0;
for (let element of totalElements) {
  // convert text content to a number and add it to sum
  sum += Number(element.textContent);
  totalSum.textContent = sum
}

// Increment quantity
incrementButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the index of the product
    const index = button.getAttribute('data-index');

    // Get the current quantity and total price for the product
    const currentQuantity = parseInt(quantityInputs[index].value);
    const currentTotal = parseFloat(totalElements[index].textContent);
    const productId = productID[index].value

    // Get the new quantity from the quantity input field
    const newQuantity = currentQuantity + 1;
    console.log(newQuantity, 'new quantiy');
    // Calculate the new total price
    const newTotal = currentTotal / currentQuantity * newQuantity;

    // Find sum
    let sum = 0;
    for (let element of totalElements) {
    // convert text content to a number and add it to sum
    sum += Number(element.textContent) + newTotal;
    }

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
        totalSum.textContent = sum
      }
    })
    .catch(error => console.error(error));
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
    const newQuantity = currentQuantity - 1;
    // Calculate the new total price
    const newTotal = currentTotal / currentQuantity * newQuantity;

    // Find sum
    let sum = 0;
    for (let element of totalElements) {
    // convert text content to a number and add it to sum
    sum += Number(element.textContent);
    }

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
        totalSum.textContent = sum
      }
    })
    .catch(error => console.error(error));
  });
});

