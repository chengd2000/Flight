const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config(); // Load .env file

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Endpoint for Yelp API
app.get('/api/yelp', async (req, res) => {
  const { location } = req.query;
  try {
    const response = await axios.get(`https://api.yelp.com/v3/businesses/search`, {
      params: { location, sort_by: 'distance', limit: 20 },
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELPAPIKEY}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching Yelp data');
  }
});

// Endpoint for HERE API
app.get('/api/here', async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(`https://transit.hereapi.com/v8/stations`, {
      params: { in: `${lat},${lon};r=1000000`, apiKey: process.env.REACT_APP_HEREAPIKEY }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching HERE data');
  }
});

// Endpoint for Weather API
app.get('/api/weather', async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
      params: { key: process.env.REACT_APP_WEATHERAPIKEY, q: `${lat},${lon}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching Weather data');
  }
});

// Endpoint for Amadeus API
app.post('/api/amadeus', async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.REACT_APP_AMADEUSAPIKEY,
      client_secret: process.env.REACT_APP_AMADEUSSECRETAPIKEY
    }));
    const accessToken = tokenResponse.data.access_token;

    const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode`, {
      params: { latitude, longitude, radius: 10, radiusUnit: 'KM', hotelSource: 'ALL' },
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching Amadeus data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

