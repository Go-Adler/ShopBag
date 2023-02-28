function unblockUser(userId) {
  fetch('users/unblock-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: userId })
  })
  .then(response => {
    if (response.ok) {
      // Update the UI to indicate that the user has been unblocked
      const button = document.querySelector(`button[data-user-id="${userId}"]`);
      button.textContent = 'Block';
      button.classList.remove('btn-success');
      button.classList.add('btn-danger');
    } else {
      console.error('Error unblocking user');
    }
  })
  .catch(error => {
    console.error('Error unblocking user:', error);
  });
}