const disableButton = document.querySelectorAll(".disableBtn")

function disable(categoryId) {
  console.log('coming here');
  fetch('category/disable', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ categoryId })
  })
  .then(response => {
    if (response.ok) {
      user.isActive
    }
  })
  .catch(error => {
    console.error('Error unblocking user:', error);
  });
}

disableButton.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-value")
    
  })
})