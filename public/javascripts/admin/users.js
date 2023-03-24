const errorMessage = document.querySelector(".errorMessage")

function unblockUser(userId) {
  fetch('users/unblock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: userId })
  })
  .then(response => {
    console.log('hi');
    if (response.ok) {
      window.location.href = 'users';
    } else {
      console.error('Error unblocking user');
    }
  })
  .catch(error => {
      console.error("Error disabling user:", error)
      errorMessage.textContent = `Error in unblock user: ${error}`
  });
}

function blockUser(userId) {
  fetch('users/block', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: userId })
  })
  .then(response => {
    console.log('hi');
    if (response.ok) {
     window.location.href = 'users';
    } else {
      console.error('Error unblocking user');
    }
  })
  .catch(error => {
    console.error("Error in block user:", error)
      errorMessage.textContent = `Error in unblock user: ${error}`
  });
}