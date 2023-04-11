// Get the canvas context
let ctx = document.querySelector('.myChart').getContext('2d')
let category1 = document.querySelector('.category1').getContext('2d')


let orders = document.querySelector('#orders')
const totalArea = document.querySelector('#total')
const dataArea = document.querySelector('#data')

let monthlySalesData

fetch('/admin/dashboard')
  .then((response) => {
    return response.json()
  })
  .then((responseData) => {
    monthlySalesData = responseData.monthlySales
    // Extract the labels and data from the monthly sales data
    const labels = monthlySalesData.map(
      ({ year, month }) => `${year}-${month + 1}`
    )
    const data = monthlySalesData.map(({ total }) => total)

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Total sales in rupees  ',
            data,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
    new Chart(category1, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Total sales in rupees  ',
            data,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  })
