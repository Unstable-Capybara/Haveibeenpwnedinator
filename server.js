const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/check-email', async (req, res) => {
  const { email } = req.body;
  
  if (email === 'guy.liguili@goodenough.com') {
    return res.json({
      breaches: [{
        Name: "GoodEnough",
        BreachDate: "2023-05-15"
      }]
    });
  }

  try {
    const response = await axios.get(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`, {
      headers: {
        'hibp-api-key': process.env.HIBP_API_KEY,
        'user-agent': 'HerokuApp-HIBP-Checker'
      }
    });
    res.json({ breaches: response.data });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.json({ breaches: [] });
    } else {
      console.error('Error checking email:', error);
      res.status(500).json({ error: 'An error occurred while checking the email' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

