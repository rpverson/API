//CORS added policy

const express = require('express');
const app = express();
const csv = require('csvtojson');
const https = require('https');

const csvFileUrl = 'https://raw.githubusercontent.com/rpverson/API/main/data.csv'; // Reemplaza con la URL real de tu archivo CSV
const port = process.env.PORT || 3000;

// Middleware para permitir solicitudes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/productos', (req, res) => {
    const searchTerm = req.query.search || ''; // Obtiene el término de búsqueda de los parámetros de la URL
  
    https.get(csvFileUrl, (response) => {
      let data = '';
  
      response.on('data', (chunk) => {
        data += chunk;
      });
  
      response.on('end', () => {
        csv()
          .fromString(data)
          .then((jsonObj) => {
            // Filtra los productos basados en el término de búsqueda
            const filteredProducts = jsonObj.filter(producto =>
              producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
  
            res.json(filteredProducts);
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
