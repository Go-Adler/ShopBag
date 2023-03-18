// Select all the necessary DOM elements
const errorMessage = document.querySelector(".errorMessage")
const successMessage = document.querySelector(".successMessage")
const nameError = document.querySelector(".nameError")
const nameSuccess = document.querySelector(".nameSuccess")
const actionButtons = document.querySelectorAll(".toggleButton")
const badge = document.querySelectorAll(".badge")
const editButtons = document.querySelectorAll(".editBtn")

// Add event listeners to each of the disable buttons
actionButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const id = button.dataset.value

    const requestBody = { id }
    if (button.classList.contains("enableBtn")) {
      // Create the options object for the fetch request
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }

      // Send the fetch request to the server
      fetch("category/enable", requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(response.statusText)
          }
        })
        .then((data) => {
          // Update the button text and error message on successful response
          if (data.success) {
            button.textContent = "Disable"
            button.classList.remove("enableBtn")
            button.classList.add("disableBtn")
            successMessage.textContent = "Category Enabled successfully: "
            nameSuccess.textContent = button.dataset.name
            badge[index].classList.remove("badge-success", "active")
            badge[index].classList.add("badge-danger", "inactive")
            badge[index].textContent = "Active"
          }
        })
        .catch((error) => {
          // Update the error message on failed response
          errorMessage.textContent = error.message
        })
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }

      // Send the fetch request to the server
      fetch("category/disable", requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(response.statusText)
          }
        })
        .then((data) => {
          // Update the button text and error message on successful response
          if (data.success) {
            button.textContent = "Enable"
            button.classList.remove("disableBtn")
            button.classList.add("enableBtn")
            successMessage.textContent = "Category disabled successfully: "
            nameSuccess.textContent = button.dataset.name
            const index = button.getAttribute("data-activeIndex")
            badge[index].classList.remove("badge-danger", "inactive")
            badge[index].classList.add("badge-success", "active")
            badge[index].textContent = "Blocked"
          }
        })
        .catch((error) => {
          // Update the error message on failed response
          errorMessage.textContent = error.message
        })
    }
  })
})

// Add event listeners to each of the disable buttons
editButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const id = actionButtons[index].dataset.value
    const requestBody = { id }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }

    // Send the fetch request to the server
    fetch("category/disable", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error(response.statusText)
        }
      })
      .then((data) => {
        // Update the button text and error message on successful response
        if (data.success) {
          button.textContent = "Enable"
          button.classList.remove("disableBtn")
          button.classList.add("enableBtn")
          successMessage.textContent = "Category disabled successfully: "
          nameSuccess.textContent = button.dataset.name
          badge[index].classList.remove("badge-danger", "inactive")
          badge[index].classList.add("badge-success", "active")
          badge[index].textContent = "Blocked"
        }
      })
      .catch((error) => {
        // Update the error message on failed response
        errorMessage.textContent = error.message
      })
  })
})
