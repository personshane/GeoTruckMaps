# GeoTruck Maps Architecture

## Overview

GeoTruck Maps is a two-tier MVP for commercial truck routing. The backend is a Node.js server running Express that accepts route requests, forwards them to Google Routes API Advanced with truck-specific parameters (height, weight, axle count, hazmat), and returns the optimized truck-safe route as JSON containing the polyline and metadata (warnings, distance, duration). The mobile frontend is a React Native application using Google Maps SDK to render the route polyline on an interactive map and display route details.

## Folder Layout

- `/backend` - Node.js + Express server, handles API requests, integrates with Google Routes API Advanced
- `/mobile` - React Native mobile application, user interface and map rendering
- `/docs` - Project documentation including architecture, API specs, and design decisions
- `/project-knowledge` - Technical notes, decisions, and reference material for development

## MVP Data Flow

1. User opens mobile app, enters origin and destination addresses, selects truck parameters
2. Mobile app sends POST request to backend server with route request payload
3. Backend server validates request, constructs Google Routes API Advanced request with truck profile
4. Backend calls Google Routes API Advanced, receives truck-optimized route with restrictions
5. Backend extracts polyline, distance, duration, and warning metadata from API response
6. Backend returns formatted JSON response to mobile app
7. Mobile app decodes polyline, renders route on Google Maps SDK, displays metadata to user
