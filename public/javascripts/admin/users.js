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
    console.error('Error unblocking user:', error);
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
    console.error('Error unblocking user:', error);
  });
}