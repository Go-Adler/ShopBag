const trashes = document.querySelectorAll('.fa-trash')
const addressArea = document.querySelectorAll('.addressArea')

trashes.forEach((button, index) => {
  button.addEventListener('click', () => {
    const id  = button.dataset.id
    const requestBody = { id }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    }

    fetch('/user/profile/address/remove', requestOptions)
    .then(response => {
      if (response.ok) {
        addressArea[index].remove()
      } else {
        throw new Error ('Error removing address')
      }
    })
    .catch(error =>{
      console.log(`Error in removing address, ${error}`)
      errorMessage.textContent = `Error removing address, ${error}`
    })
  })
})