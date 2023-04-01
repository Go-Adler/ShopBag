console.log(1);
const invoice = document.querySelector('.invoice')

invoice.addEventListener('click', () => {
  console.log(5);
  const userId = invoice.dataset.order
  fetch(`invoice-download/${userId}`)
  .then(response => {
    console.log('Response:', response);
    if(response.ok) {
      return response.blob();
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .then(blob => {
    console.log('Blob:', blob);
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