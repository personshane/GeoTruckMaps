const axios = require('axios');

exports.getTruckRoute = async (req, res) => {
  try {
    const { origin, destination, truck } = req.body;
    
    if (!origin || !destination) {
      return res.status(400).json({ error: 'origin and destination are required' });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Google API key missing in environment' });
    }

    const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;
    
    const payload = {
      origin: { address: origin },
      destination: { address: destination },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE",
      vehicleInfo: {
        heightMeters: truck?.height || 4.1,
        widthMeters: truck?.width || 2.5,
        lengthMeters: truck?.length || 16,
        weightKg: truck?.weight || 36000,
        vehicleType: "TRUCK"
      },
      polylineQuality: "HIGH_QUALITY",
      polylineEncoding: "GEO_JSON"
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': '*'
    };

    const response = await axios.post(url, payload, { headers });
    
    const route = response.data.routes?.[0];
    if (!route) {
      return res.status(500).json({ error: 'No route returned from Google' });
    }

    return res.json({
      polyline: route.polyline,
      localizedValues: route.localizedValues,
      warnings: route.warnings,
      tollInfo: route.tollInfo,
      truckApplied: payload.vehicleInfo
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Google Routes API call failed' });
  }
};
