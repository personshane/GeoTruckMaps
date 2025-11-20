const axios = require('axios');

exports.getTruckRoute = async (req, res) => {
  try {
    const { origin, destination } = req.body;
    
    if (!origin || !destination) {
      return res.status(400).json({ error: 'origin and destination are required' });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey || apiKey === 'YOUR_KEY_HERE') {
      return res.status(500).json({ error: 'Google API key missing in environment' });
    }

    const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;
    
    const payload = {
      origin: { address: origin },
      destination: { address: destination },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE",
      polylineQuality: "HIGH_QUALITY",
      polylineEncoding: "GEO_JSON_LINESTRING"
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline,routes.warnings,routes.travelAdvisory'
    };

    const response = await axios.post(url, payload, { headers });
    
    const route = response.data.routes?.[0];
    if (!route) {
      return res.status(500).json({ error: 'No route returned from Google' });
    }

    return res.json({
      polyline: route.polyline,
      duration: route.duration,
      distanceMeters: route.distanceMeters,
      warnings: route.warnings,
      travelAdvisory: route.travelAdvisory,
      note: 'Google Routes API v2 does not support truck-specific parameters (height, weight, etc.). Consider Route Optimization API for truck routing.'
    });
  } catch (err) {
    console.error('Error details:', err.response?.data || err.message);
    console.error('Status:', err.response?.status);
    return res.status(500).json({ 
      error: 'Google Routes API call failed',
      details: err.response?.data || err.message
    });
  }
};
