const getReportButton = document.querySelector('.enableBtn')
const dateFromInput = document.querySelector('.dateFrom')
const dateToInput = document.querySelector('.dateTo')
const eachProduct = document.querySelector('.eachhProduct')
const download = document.querySelector('.download')


getReportButton.addEventListener('click', () => {
  const dateFrom = dateFromInput.value
  const dateTo = dateToInput.value
  const requestBody = {
    dateFrom,
    dateTo
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody)
  }
  
  fetch('/admin/report/sales', requestOptions)
  .then(response => {
    if(response.ok) return response.json()
    download.innerHTML = 'Download'
  })
  .then(data => {
    download.classList.remove('d-none')
    eachProduct.innerHTML = ''
    let serialNumber = 1
    let total = 0
    data.orders.forEach(order => {
      let date = new Date(order.orderDate);
      eachProduct.innerHTML += `
      <tr>
        <td class="text-center" style='vertical-align: middle;'> ${serialNumber}  </td>
        <td class="text-center" style='vertical-align: middle;'> ${
           date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()} </td>
        
        
        
        <td class="text-center" style='vertical-align: middle;'><span class='p-1 border'> ${order._id } </span></td>
        <td class="d-flex w-100 flex-column gap-2">
          <div class="d-flex flex-column justify-content-center gap-2">
          ${
            order.products.map(product => { 
              return `<span class="border p-1"> ${product.product.productName } x  ${product.quantity}  x ₹ ${product.product.price}  = ₹ ${product.quantity * product.product.price} </span>`
            }).join("")
          }
          </div>
        </td>
        <td class="text-center" style='vertical-align: middle;'> ${order.paymentMode}   </td>
        <td class="text-center" style='vertical-align: middle;'>
            ${order.orderStatus}  
        </td>
        <td class="text-center" style='vertical-align: middle;'>
           ${order.total}
          <span class='d-none'> ${total = total + order.total} </span>
        </td>
      </tr> `
      
  
     serialNumber++ 
    });
    eachProduct.innerHTML += `<tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td><b>${ total }</b></td>
  </tr>`
  })
})

download.addEventListener('click', () => {
  download.innerHTML = 'Downloading'
  const dateFrom = dateFromInput.value
  const dateTo = dateToInput.value
  const requestBody = {
    dateFrom,
    dateTo
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody)
  }
  fetch('/admin/report/sales/download', requestOptions)
  .then(response => {
    if(response.ok) {
      download.innerHTML = 'Download success'
      setTimeout(() => {
        download.innerHTML = 'Download again'
      }, 3000);
      return response.blob() 
    }
  })
  .then(blob => {
    // Create a URL for the blob object
    const url = URL.createObjectURL(blob);
    // Create a link element and click it to download the file
    const link = document.createElement('a');
    link.href = url;
    link.download = 'report.pdf';
    link.click();
  })
  .catch(error => {
    download.innerHTML = 'Download failed'
    console.error('Error downloading report:', error);
  });
})