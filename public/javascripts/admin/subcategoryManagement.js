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
        body: JSON.stringify(requestBody)
      }

      // Send the fetch request to the server
      fetch("/admin/category/subcategory/enable", requestOptions)
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
          successMessage.textContent = "Category enabled successfully: "
          nameSuccess.textContent = button.dataset.name
          badge[index].classList.add("badge-success", "active")
          badge[index].classList.remove("badge-danger", "inactive")
          badge[index].textContent = "Active"
        }
      })
      .catch((error) => {
        console.error("Error in enable:", error)
        errorMessage.textContent = `Error in enable: ${error}`
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
      fetch("/admin/category/subcategory/disable", requestOptions)
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
            badge[index].classList.add("badge-danger", "inactive")
            badge[index].classList.remove("badge-success", "active")
            badge[index].textContent = "Blocked"
          }
        })
        .catch((error) => {
          console.error("Error in disable:", error)
          errorMessage.textContent = `Error in disable: ${error}`
        })
    }
  })
})


