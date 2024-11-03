function submitMessage() {
  const username = document.getElementById('username');
  const country = document.getElementById('country');
  const message = document.getElementById('message');

  if(!username.value || !country.value || !message.value){
    alert('Please fill in all fields')
    return
  }

  const data = {
    username: username.value,
    country: country.value,
    message: message.value,
  };

  fetch('/ajaxsubmit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');  
      }
      return response.json();
    })
    .then(() => {
      const alert = document.getElementById('alert');

      // Optionally, show a single "Message posted successfully" alert
      const successMessage = document.createElement('div');
      successMessage.className = 'alert alert-info';
      successMessage.innerHTML = 'Message posted successfully';

      // Clear the input fields
      username.value = '';
      country.value = '';
      message.value = '';

      alert.appendChild(successMessage);

      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to post message. Please try again.');
    });
}
