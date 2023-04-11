// Get the canvas context
let ctx = document.getElementById('myChart').getContext('2d');
let orders = document.querySelector('#orders')
const totalArea = document.querySelector('#total')
const dataArea = document.querySelector('#data')

let arr

fetch('/admin/dashboard')
.then(response => {
  return response.json()
})
.then(data => {
  console.log(data.total, 13);
  arr = data.total
  data.total.forEach(element => {
    dataArea.innerHTML += `${element},`
  });
})



 const myChart = new Chart(ctx, {
   type: 'bar',
   data: {
     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
     datasets: [{
       label: 'Total sales in rupees  ',
       data: [10, 20, 30, 40, 50, 60, 70, 80, 10, 100, 110, 50],
     }]
   },
   options: {
     scales: {
       y: {
         beginAtZero: true
       }
     }
   }
 });
 
 