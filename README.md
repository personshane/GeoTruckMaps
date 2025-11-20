# GeoTruck Maps

Commercial truck-safe routing MVP using Google Routes API Advanced.

## Architecture

**Backend:** Node.js server calling Google Routes API Advanced  
**Mobile:** React Native app displaying routes via Google Maps SDK

## MVP Scope

- **Input:** Origin, destination, truck parameters (height, weight, axles, hazmat)
- **Processing:** Backend calls Google Routes API with truck profile
- **Output:** Truck-safe route polyline + key warnings (low bridges, weight restrictions, hazmat prohibitions)

## Project Structure

- `/backend` - Node.js + Express server
- `/mobile` - React Native mobile app
- `/docs` - Architecture and design documentation
- `/project-knowledge` - Technical notes and decisions

## Technology Stack

- **Backend:** Node.js, Express, Google Routes API Advanced
- **Mobile:** React Native, Google Maps SDK
- **API:** Google Routes API Advanced (truck routing with restrictions)

## Development Status

See `/docs/MICRO_PROJECTS.md` for detailed progress tracking.
