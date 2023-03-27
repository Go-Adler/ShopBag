const codes = document.querySelectorAll('.code')
const badge = document.querySelectorAll('.badge')
const actionButtons = document.querySelectorAll('.actionButton')
const errorMessage = document.querySelector('.errorMessage')
const successMessage = document.querySelector('.successMessage')

actionButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    errorMessage.innerHTML = ''
    successMessage.innerHTML = ''
    const { id } = codes[index].dataset
    if (button.classList.contains('enableBtn')) {
      fetch(`/admin/coupon/enable/${id}`)
      .then(async response => {
        if(response.ok) {
          button.classList.remove('enableBtn')
          button.classList.add('disableBtn')
          badge[index].classList.add('active')
          badge[index].classList.remove('inactive')
          badge[index].innerHTML = 'Enabled'
          button.innerHTML = 'Disable'
          successMessage.innerHTML = `Coupon enabled successfully: ${codes[index].innerHTML}`
        } else {
          const data = await response.json()
          throw new Error (data.message)
        }
      })
      .catch(error => {
        errorMessage.innerHTML = error
      })
    } else {
      fetch(`/admin/coupon/disable/${id}`)
      .then(async response => {
        if(response.ok) {
          button.classList.add('enableBtn')
          button.classList.remove('disableBtn')
          button.innerHTML = 'Enable'
          badge[index].classList.remove('active')
          badge[index].classList.add('inactive')
          badge[index].innerHTML = 'Disabled'
          successMessage.innerHTML = `Coupon disabled successfully: ${codes[index].innerHTML}`
        } else {
          const data = await response.json()
          throw new Error (data.message)
        }
      })
      .catch(error => {
        errorMessage.innerHTML = error
      })
    }
  })
})