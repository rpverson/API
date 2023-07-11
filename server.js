const express = require('express');
const app = express();
const csvFilePath = 'ruta/al/archivo.csv'; // Reemplaza 'ruta/al/archivo.csv' con la ruta real de tu archivo CSV

app.get('/api/productos', (req, res) => {
  // Lee el archivo CSV y convierte los datos en un objeto JSON
  const csv = require('csvtojson');
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      res.json(jsonObj);
    });
});

app.listen(3000, () => {
  console.log('API running on port 3000');
});
