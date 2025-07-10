const express = require('express');
const app = express();
const PORT = 3000;

app.get('/hello', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/', (req, res) => {
  res.send('App2 est en marche');
});

app.listen(PORT, () => {
  console.log(`App2 démarré sur port ${PORT}`);
});
