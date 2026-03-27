# V2X Smart Safety System

A Flutter mobile app for real-time vehicle-to-everything (V2X) safety alerts using Firebase Firestore and Google Maps.

## Features

- **Real-time Alerts**: Live updates from Firebase Firestore 'alerts' collection
- **Map Integration**: Google Maps with color-coded markers for different alert levels
- **Glassmorphism UI**: Modern, futuristic dashboard design with dark mode
- **Alert Types**: accident, obstacle, road_issue
- **Risk Levels**: HIGH/MED/LOW with visual indicators
- **Trust Scores**: Circular progress indicators for alert credibility
- **Mode Toggle**: Switch between driver and pedestrian modes
- **Sound Alerts**: Audio notifications for critical alerts (requires sound file)

## Setup

1. **Firebase Configuration**:
   - Create a Firebase project
   - Enable Firestore
   - Add your Firebase config to `lib/firebase_options.dart` or configure manually
   - For Android: Add google-services.json
   - For iOS: Add GoogleService-Info.plist

2. **Google Maps API**:
   - Enable Google Maps SDK for Android/iOS
   - Add your API key to Android manifest and iOS plist

3. **Dependencies**:
   ```bash
   flutter pub get
   ```

4. **Assets**:
   - Add alert sound to `assets/sounds/alert.mp3` for critical alerts

## Architecture

- **Clean Architecture**: Separated into models, services, providers, widgets, screens
- **State Management**: Provider pattern for reactive UI updates
- **Real-time Data**: Firestore snapshots for live alert updates

## Alert Data Structure

```json
{
  "type": "accident",
  "alert_level": "CRITICAL",
  "trust_score": 85.0,
  "risk_level": "HIGH",
  "latitude": 37.7749,
  "longitude": -122.4194,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Color Coding

- **CRITICAL**: Red
- **WARNING**: Orange
- **LOW**: Gray

## Running the App

```bash
flutter run
```

## Screenshots

[Add screenshots here]

## Contributing

[Add contribution guidelines]

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.
