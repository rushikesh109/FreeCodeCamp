const express = require('express');
const app = express();

// Enable CORS
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Basic route
app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

// API endpoint
app.get('/api/:date?', (req, res) => {
  let dateInput = req.params.date;

  // If no date is provided
  if (!dateInput) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // Check if input is UNIX timestamp (pure number)
  if (/^\d+$/.test(dateInput)) {
    dateInput = parseInt(dateInput);
  }

  const date = new Date(dateInput);

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
