const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Use dynamic port for deployment

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Load the grades data from the grades.json file
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'grades.json')));

  if (data[username] && data[username].password === password) {
    res.status(200).send({
      message: 'Login successful',
      grade: data[username].grade
    });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
