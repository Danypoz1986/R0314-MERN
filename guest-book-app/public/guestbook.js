fetch('/api/messages')
      .then(response => response.json())
      .then(data => {
        const tbody = document.getElementById('messageTable');
        tbody.innerHTML = ''; // Clear existing rows
        data.forEach((item, index) => {
          const row = `<tr>
                        <td>${index + 1}</td>
                        <td>${item.username}</td>
                        <td>${item.country}</td>
                        <td>${item.message}</td>
                        <td>${item.date}</td>
                       </tr>`;
          tbody.innerHTML += row;
        });
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
        alert('Failed to load messages. Please try again later.');
      });