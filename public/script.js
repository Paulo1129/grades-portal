document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Login successful') {
          window.location.href = `/grades.html?username=${username}&grade=${data.grade}`;
        } else {
          document.getElementById('error-message').textContent = data.message;
        }
      })
      .catch(error => {
        document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
      });
  });
  