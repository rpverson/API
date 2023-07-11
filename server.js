//New Code

const express = require('express');
const app = express();
const csv = require('csvtojson');
const https = require('https');

const csvFileUrl = 'https://raw.githubusercontent.com/rpverson/API/main/data.csv'; // Reemplaza con la URL real de tu archivo CSV
const port = process.env.PORT || 3000;

app.get('/api/productos', (req, res) => {
  https.get(csvFileUrl, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      csv()
        .fromString(data)
        .then((jsonObj) => {
          res.json(jsonObj);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        });
    });
  });
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
