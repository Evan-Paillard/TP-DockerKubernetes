const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const APP2_URL = 'http://app2-service:3000';

app.get('/health', async (req, res) => {
  try {
    const response = await axios.get(`${APP2_URL}/hello`, { timeout: 3000 });
    
    if (response.status === 200) {
      res.status(200).json({ status: 'UP' });
    } else {
      res.status(500).json({ status: 'DOWN' });
    }
  } catch (error) {
    res.status(500).json({ status: 'DOWN' });
  }
});

app.get('/', (req, res) => {
  res.send('App1 tourne');
});

app.listen(PORT, () => {
  console.log(`App1 démarre sur le port ${PORT}`);
});
