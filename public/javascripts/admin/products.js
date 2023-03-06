function disableProduct(productId) {
  fetch('products/disable', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId })
  })
  .then(response => {
    if (response.ok) {
      window.location.href = 'products';
    } else {
      console.error('Error disabling product');
    }
  })
  .catch(error => {
    console.error('Error disabling user:', error);
  });
}

function enableProduct(productId) {
  fetch('products/enable', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId })
  })
  .then(response => {
    if (response.ok) {
     window.location.href = 'products';
    } else {
      console.error('Error enabling product');
    }
  })
  .catch(error => {
    console.error('Error enabling product:', error);
  });
}

function editProduct(productId) {
  fetch('products/edit', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId })
  })
  .then(response => {
    if (response.ok) {
     window.location.href = 'products';
    } else {
      console.error('Error enabling product');
    }
  })
  .catch(error => {
    console.error('Error enabling product:', error);
  });
}