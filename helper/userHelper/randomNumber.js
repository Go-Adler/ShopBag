// Function to generate a random number
export const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 900000) + 100000
  return randomNumber
}