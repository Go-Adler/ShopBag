const getReportButton = document.querySelector('.enableBtn')
const dateFromInput = document.querySelector('.dateFrom')
const dateToInput = document.querySelector('.dateTo')

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
    console.log(data, 25);
  })
})