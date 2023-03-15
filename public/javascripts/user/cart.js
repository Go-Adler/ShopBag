const incrementButtons = document.querySelectorAll('.buttonInc');
const decrementButtons = document.querySelectorAll('.buttonDec');
const quantityInputs = document.querySelectorAll('.quantity-input');
const totalElements = document.querySelectorAll('.total');
const productID = document.querySelectorAll(".id")

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

    // Make an AJAX request to the server to update the quantity and total price
    fetch('cart/update', {
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
        console.log('hi');
        // Update the quantity and total price in the UI
        quantityInputs[index].value = newQuantity;
        totalElements[index].textContent = newTotal.toFixed(2);
      }
    })
    .catch(error => console.error(error));
  });
});
