const express = require('express');
const app = express();
const csv = require('csvtojson');

const csvFileUrl = 'https://github.com/rpverson/API/blob/main/data.csv'; // Reemplaza con la URL real de tu archivo CSV

app.get('/api/productos', (req, res) => {
  csv()
    .fromStream(request.get(csvFileUrl))
    .then((jsonObj) => {
      res.json(jsonObj);
    });
});

app.listen(3000, () => {
  console.log('API running on port 3000');
});

