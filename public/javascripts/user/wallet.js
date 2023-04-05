const orders = document.querySelectorAll('.order')

orders.forEach(order => {
  order.addEventListener('click', () => {
    const orderId = order.dataset.order
    window.location.href = `/user/orders/${orderId}`
  })
})