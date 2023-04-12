const invoice = document.querySelector('.invoice')
const returnOrder = document.querySelector('.return')
const body = document.querySelector('body')
const areYouSure = document.querySelector('.areYouSure')
const cancelButton = document.querySelector('.cancelButton')
const returnLink = document.querySelector('.returnLink')
const continueButton = document.querySelector('.continueButton')
const cancelOrder = document.querySelector('.cancelOrder')
const cancelOrderLink = document.querySelector('.cancelOrderLink')
const messageArea = document.querySelector('.messageArea')

cancelButton.addEventListener('click', () => {
  body.classList.remove('bodyOverflow')
  areYouSure.classList.add('d-none')
})

continueButton.addEventListener('click', () => {
  returnLink.click()
})

if(cancelOrder) {
  cancelOrder.addEventListener('click', () => {
    console.log('click');
    body.classList.add('bodyOverflow')
    areYouSure.classList.remove('d-none')
    continueButton.innerHTML = 'Yes'
    cancelButton.innerHTML = 'No'
    continueButton.classList.add('disableBtn')
    messageArea.innerHTML = 'Are you sure you need to cancel this order?'
  })
}

invoice.addEventListener('click', () => {
  invoice.innerHTML = `Downloading ... <i class="fa-solid fa-file-arrow-down"></i>`
  const userId = invoice.dataset.order
  fetch(`invoice-download/${userId}`)
  .then(response => {
    if(response.ok) {
      return response.blob() 
    }
  })
  .then(blob => {
    // Create a URL for the blob object
    const url = URL.createObjectURL(blob);
    // Create a link element and click it to download the file
    const link = document.createElement('a');
    link.href = url;
    link.download = 'invoice.pdf';
    link.click();
    invoice.innerHTML = `Download success <i class="fa-regular fa-circle-check"></i>`
    setTimeout(() => {
      invoice.innerHTML = `Download invoice <i class="fa-regular fa-file-lines"></i>`
    }, 3000)
  })
  .catch(error => {
    console.error('Error downloading invoice:', error);
  });
})

returnOrder.addEventListener('click', () => {
 body.classList.add('bodyOverflow')
 areYouSure.classList.remove('d-none')
})