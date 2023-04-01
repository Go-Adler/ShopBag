console.log(1);
const invoice = document.querySelector('.invoice')

invoice.addEventListener('click', () => {
  const userId = invoice.dataset.order
  fetch(`invoice-download/${userId}`)
  .then(response => {
    if(response.ok) {
      return response.blob() 
    }
  })
  .then(blob => {
     console.log(typeof blob); // check type of blob variable
    // Create a URL for the blob object
    const url = URL.createObjectURL(blob);
    // Create a link element and click it to download the file
    const link = document.createElement('a');
    link.href = url;
    link.download = 'invoice.pdf';
    link.click();
  })
  .catch(error => {
    console.error('Error downloading invoice:', error);
  });
})