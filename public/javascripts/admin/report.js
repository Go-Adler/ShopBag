const getReportButton = document.querySelector('.enableBtn')
const dateFromInput = document.querySelector('.dateFrom')
const dateToInput = document.querySelector('.dateTo')
const eachProduct = document.querySelector('.eachhProduct')

getReportButton.addEventListener('click', () => {
  const dateFrom = dateFromInput.value
  const dateTo = dateToInput.value
  const requestBody = {
    dateFrom,
    dateTo
  }
  console.log(requestBody, 12);
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
  })
  .then(data => {
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