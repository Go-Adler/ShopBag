// Get the canvas context
let ctx = document.querySelector('.myChart').getContext('2d')
let category = document.querySelector('.categorySales').getContext('2d')
let subcategory = document.querySelector('.subcategorySales').getContext('2d')
let subcategory2 = document.querySelector('.subcategorySales2').getContext('2d')



let orders = document.querySelector('#orders')
const totalArea = document.querySelector('#total')
const dataArea = document.querySelector('#data')

let monthlySalesData, categorySales, subcategorySales

fetch('/admin/dashboard')
  .then((response) => {
    return response.json()
  })
  .then((responseData) => {
    console.log(responseData, 16);
    monthlySalesData = responseData.monthlySales
    categorySales = responseData.categorySales
    subcategorySales = responseData.subcategorySales

    console.log(categorySales, 21);

    // Extract the labels and data from the monthly sales data
    let labels = monthlySalesData.map(
      ({ year, month }) => `${year}-${month + 1}`
    )
    let data = monthlySalesData.map(({ total }) => total)

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

    labels = categorySales.map(function(obj) {
      return Object.keys(obj)[0]; 
    });

    data = categorySales.map((obj) => {
      return Object.values(obj)[0]
    })

    new Chart(category, {
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
    labels = subcategorySales.map(function(obj) {
      return Object.keys(obj)[0]; 
    });
  
    data = subcategorySales.map((obj) => {
      return Object.values(obj)[0]
    })
  
    new Chart(subcategory, {
      type: 'pie',
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

    new Chart(subcategory2, {
      type: 'line',
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
