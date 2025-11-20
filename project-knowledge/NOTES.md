# GeoTruck Maps - Technical Notes

## Technology Stack

- **Backend Stack:** Node.js + Express
- **Mobile Stack:** React Native + Google Maps SDK
- **Routing Engine:** Google Routes API Advanced
- **API Integration:** RESTful communication between mobile and backend

## Core Technical Decisions

- Using Google Routes API Advanced for truck-specific routing (height, weight, axle restrictions)
- React Native for cross-platform mobile development (iOS + Android from single codebase)
- Express for lightweight backend API server
- Google Maps SDK for mobile map rendering and polyline display

## API Key Requirements

- Google Routes API Advanced key (backend)
- Google Maps SDK key (mobile - separate for iOS/Android)

## Development Notes

**Micro-Project 3 Finding - Truck Routing Limitations:**
- Google Routes API v2 (computeRoutes endpoint) does NOT support truck-specific parameters
- Parameters like heightMeters, weightKg, lengthMeters, vehicleType are not available in Routes API v2
- The API only supports standard travel modes: DRIVE, WALK, BICYCLE, TRANSIT, TWO_WHEELER
- For truck routing with dimensional restrictions, would need Google Route Optimization API (different product)
- Current implementation uses standard DRIVE mode with TRAFFIC_AWARE routing preference
- Returns: polyline (GeoJSON), duration, distance, warnings, travel advisory

**API Configuration:**
- Endpoint: https://routes.googleapis.com/directions/v2:computeRoutes
- Headers: X-Goog-Api-Key, X-Goog-FieldMask, Content-Type
- Polyline Encoding: GEO_JSON_LINESTRING (corrected from invalid "GEO_JSON")
- Field Mask: routes.duration,routes.distanceMeters,routes.polyline,routes.warnings,routes.travelAdvisory

_(Additional technical decisions, API findings, and implementation notes will be added here during development)_
