const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Load messages from file
const messagesFile = path.join(__dirname, 'data', 'guestbook.json');

// Helper function to read messages from JSON file
const readMessages = () => {
  try {
    if (!fs.existsSync(messagesFile)) {
      fs.writeFileSync(messagesFile, JSON.stringify([])); // Initialize with empty array if file doesn't exist
    }
    const data = fs.readFileSync(messagesFile, 'utf8'); // Ensure UTF-8 encoding
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading messages:", error);
    return [];
  }
};

// Helper function to write messages to JSON file
const writeMessages = (messages) => {
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
};

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/guestbook', (req, res) => res.sendFile(path.join(__dirname, 'public', 'guestbook.html')));
app.get('/newmessage', (req, res) => res.sendFile(path.join(__dirname, 'public', 'newmessage.html')));
app.get('/ajaxmessage', (req, res) => res.sendFile(path.join(__dirname, 'public', 'ajaxmessage.html')));

// Route to fetch messages (for AJAX loading in guestbook.html)
app.get('/api/messages', (req, res) => {
  const messages = readMessages();
  console.log("Messages fetched:", messages);
  res.json(messages);
});

// Route to handle form submission from "/newmessage"
app.post('/addmessage', (req, res) => {
  const { username, country, message } = req.body;
  if (!username || !country || !message) {
    return res.status(400).send('All fields are required');
  }

  const newMessage = {
    username,
    country,
    message,
    date: new Date().toLocaleString('fi-FI', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  };

  const messages = readMessages();
  messages.push(newMessage);
  writeMessages(messages);

  res.redirect('/guestbook');
});

// Route to handle AJAX form submission from "/ajaxmessage"
app.post('/ajaxsubmit', (req, res) => {
  const { username, country, message } = req.body;
  if (!username || !country || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newMessage = {
    username,
    country,
    message,
    date: new Date().toLocaleString('fi-FI', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  };

  const messages = readMessages();
  messages.push(newMessage);
  writeMessages(messages);

  res.json(messages); // Return updated messages list
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
