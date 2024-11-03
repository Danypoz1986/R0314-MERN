function submitMessage() {
  const username = document.getElementById('username').value;
  const country = document.getElementById('country').value;
  const message = document.getElementById('message').value;

  if (!username || !country || !message) {
    alert('Please fill in all fields');
    return;
  }

  const data = { username, country, message };

  fetch('/ajaxsubmit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit the message');
      }
      return response.json();
    })
    .then(() => {
      // Show the success message
      const successMessage = document.getElementById('successMessage');
      successMessage.style.display = 'block';

      // Clear the input fields
      document.getElementById('username').value = '';
      document.getElementById('country').value = '';
      document.getElementById('message').value = '';

      // Optionally hide the success message after a few seconds
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000); // 3 seconds
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to submit message. Please try again.');
    });
}
