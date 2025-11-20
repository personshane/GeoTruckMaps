require('dotenv').config();
const express = require('express');
const { getTruckRoute } = require('./routeController');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'GeoTruck Maps Backend' });
});

app.post('/route', getTruckRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
