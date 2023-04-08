 // Get the canvas context
 let ctx = document.getElementById("myChart").getContext("2d");

 // Define some data for the chart
 var data = {
   labels: ["January", "February", "March", "April", "May", "June", "July"],
   datasets: [
     {
       label: "Sales",
       data: [65, 59, 80, 81, 56, 55, 40],
       borderColor: "#2c9c69",
       backgroundColor: "#d0dde3",
       fill: true,
     },
   ],
 };

 // Define some options for the chart
 var options = {
   responsive: true,
   plugins: {
     legend: {
       position: "top",
     },
     title: {
       display: true,
       text: "Monthly Sales",
     },
   },
 };

 // Create a new Chart object with the canvas context and the chart configuration
 var myChart = new Chart(ctx, {
   type: "line",
   data: data,
   options: options,
 });