const invoice = document.querySelector('.invoice')

invoice.addEventListener('click', () => {
  const userId = invoice.dataset.order
  fetch(`invoice-download/${userId}`)
  .then(response => {
    if(response.ok) response.json() 
  })
})