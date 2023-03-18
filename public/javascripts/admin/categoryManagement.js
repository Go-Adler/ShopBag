// Select all the necessary DOM elements
const errorMessage = document.querySelector('.errorMessage');
const buttons = document.querySelectorAll('.toggleBtn')

// Add event listeners to each of the disable buttons
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-value');

    // Create the request body for the fetch request
    const requestBody = { id };

    // Create the options object for the fetch request
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };

    // Send the fetch request to the server
    fetch('category/disable', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        // Update the button text and error message on successful response
        button.textContent = 'Enable';
        button.classList.remove("disableBtn")
        button.classList.add("enableBtn")
        errorMessage.textContent = data.message;
      })
      .catch((error) => {
        // Update the error message on failed response
        errorMessage.textContent = error.message;
      });
  });
});

// Add event listeners to each of the enable buttons
enableButtons.forEach((button) => {
  button.addEventListener('click', () => {

    const id = button.getAttribute('data-value');

    // Create the request body for the fetch request
    const requestBody = { id };

    // Create the options object for the fetch request
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };

    // Send the fetch request to the server
    fetch('category/enable', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        // Update the button text and error message on successful response
        button.textContent = 'Disable';
        button.classList.remove("enableBtn")
        button.classList.add("disableBtn")
        errorMessage.textContent = data.message;
      })
      .catch((error) => {
        // Update the error message on failed response
        errorMessage.textContent = error.message;
      });
  });
});
