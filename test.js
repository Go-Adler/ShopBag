// Use event parameter instead of global event object
form.addEventListener("submit", function(event) {
  const isValid = validationFunctions.every((validationFunction) => validationFunction());
  
  // If form is not valid, prevent submission and display error message
  if (!isValid) {
    displayError.textContent = "Please fill in all required fields correctly.";
    event.preventDefault();
  }
  
  return isValid;
});

// Define form validation function
const validateForm = (event) => { // Add event parameter here
  const validationFunctions = [
    validateProductName,
    validateDescription
  ];
  
  // Check if all validation functions return true
  const isValid = validationFunctions.every((validationFunction) => validationFunction(event));
  
  // If form is not valid, prevent submission and display error message
  if (!isValid) {
    displayError.textContent = "Please fill in all required fields correctly.";
    event.preventDefault();
  }
  
  return isValid;
};

// Add event listener to form submission
form.addEventListener("submit", validateForm); 