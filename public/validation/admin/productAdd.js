// // Get form and input elements
// const form = document.querySelector("form")
// const productNameInput = document.querySelector("#productName")
// const descriptionInput = document.querySelector("#productDescription")
// const imageInput = document.querySelector("#productImage")

// // Get error message elements
// const productNameError = document.getElementById("productNameError")
// const descriptionError = document.getElementById("descriptionError")
// const displayError = document.getElementById("error")

// // Define regular expression patterns for validation
// const namePattern = /^(\w+\s)*\w+$/
// const descriptionPattern = /^.{100,}$/

// // Define input validation functions
// const validateProductName = () => {
//   if (!namePattern.test(productNameInput.value)) {
//     productNameError.textContent = "Invalid product name"
//     return false
//   } else {
//     productNameError.textContent = ""
//     return true
//   }
// }

// const validateDescription = () => {
//   if (!descriptionPattern.test(descriptionInput.value)) {
//     descriptionError.textContent =
//       "Product description should contain at least 100 characters"
//     return false
//   } else {
//     descriptionError.textContent = ""
//     return true
//   }
// }

// // Add event listeners to input elements
// productNameInput.addEventListener("input", validateProductName)
// descriptionInput.addEventListener("input", validateDescription)

// // Define form validation function
// const validateForm = (event) => {
//   const validationFunctions = [validateProductName, validateDescription]

//   // Check if all validation functions return true
//   const isValid = validationFunctions.every((validationFunction) =>
//     validationFunction()
//   )

//   // If form is not valid, prevent submission and display error message
//   if (!isValid) {
//     displayError.textContent = "Please fill in all required fields correctly."
//     event.preventDefault()
//   }

//   return isValid
// }

// // Add event listener to form submission
// form.addEventListener("submit", validateForm)

// // function validateImage(input) {
// //   if (input.files && input.files[0]) {
// //     const reader = new FileReader();
// //     reader.onload = function(e) {
// //       const imageType = /^image\//;
// //       if (!imageType.test(input.files[0].type)) {
// //         alert("Please select a valid image file.");
// //         return;
// //       }
// //       const img = new Image();
// //       img.src = e.target.result;
// //       img.onload = function() {
// //         const preview = document.getElementById("imagePreview");
// //         preview.innerHTML = "";
// //         preview.appendChild(img);
// //       }
// //     }
// //     reader.readAsDataURL(input.files[0]);
// //   }
// // }

// imageInput.addEventListener("change", validateImage)

// function validateImage() {
//   if (imageInput.files && imageInput.files.length > 0) {
//     for (let i = 0; i < imageInput.files.length; i++) {
//       const reader = new FileReader()
//       reader.onload = function (e) {
//         const img = new Image()
//         img.src = e.target.result
//         img.onload = function () {
//         const preview = document.getElementById("imagePreview"+i)
//         preview.innerHTML = ""
//         preview.src = img.src
//         const button = document.getElementById("button"+i)
//         button.addEventListener("click", function() {
//           span.remove();
//           imageFiles.splice(i, 1);
//           imageInput.files = imageFiles;
//         });
//         }
//       }
//       imageFiles.push(imageInput.files[i]);
//       reader.readAsDataURL(imageInput.files[i])
//     }
//   }
// }



