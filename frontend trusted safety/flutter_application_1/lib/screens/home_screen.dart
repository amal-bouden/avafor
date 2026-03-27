import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:provider/provider.dart';
import 'package:audioplayers/audioplayers.dart';
import '../providers/alert_provider.dart';
import '../models/alert.dart';
import '../widgets/alert_card.dart';
import '../widgets/risk_indicator.dart';
import '../widgets/glass_container.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  // ignore: unused_field
  GoogleMapController? _mapController;

  @override
  void initState() {
    super.initState();
    // Initialize map controller if needed
  } // TODO: Use for camera controls
  final AudioPlayer _audioPlayer = AudioPlayer();

  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }

  void _onMapCreated(GoogleMapController controller) {
    _mapController = controller;
  }

  void _playCriticalAlertSound() async {
    // await _audioPlayer.play(AssetSource('sounds/alert.mp3'));
  }

  Set<Marker> _createMarkers(List<Alert> alerts) {
    return alerts.map((alert) {
      return Marker(
        markerId: MarkerId(alert.id),
        position: LatLng(alert.latitude, alert.longitude),
        icon: BitmapDescriptor.defaultMarkerWithHue(
          alert.alertLevel == 'CRITICAL'
              ? BitmapDescriptor.hueRed
              : alert.alertLevel == 'WARNING'
                  ? BitmapDescriptor.hueOrange
                  : BitmapDescriptor.hueAzure,
        ),
      );
    }).toSet();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<AlertProvider>(
        builder: (context, alertProvider, child) {
          final alerts = alertProvider.alerts;

          // Check for new critical alerts
          final criticalAlerts = alerts.where((a) => a.alertLevel == 'CRITICAL').toList();
          if (criticalAlerts.isNotEmpty) {
            _playCriticalAlertSound();
          }

          return Stack(
            children: [
              GoogleMap(
                initialCameraPosition: const CameraPosition(
                  target: LatLng(37.7749, -122.4194), // San Francisco
                  zoom: 12,
                ),
                markers: _createMarkers(alerts),
                onMapCreated: _onMapCreated,
                style: '''
                  [
                    {
                      "featureType": "all",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#242f3e"
                        }
                      ]
                    },
                    {
                      "featureType": "all",
                      "elementType": "labels.text.stroke",
                      "stylers": [
                        {
                          "color": "#242f3e"
                        }
                      ]
                    },
                    {
                      "featureType": "all",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#746855"
                        }
                      ]
                    }
                  ]
                ''',
              ),
              // Top overlay - Mode toggle
              Positioned(
                top: 50,
                right: 20,
                child: GlassContainer(
                  width: 60,
                  height: 60,
                  borderRadius: BorderRadius.circular(30),
                  child: IconButton(
                    icon: Icon(
                      alertProvider.isDriverMode ? Icons.drive_eta : Icons.directions_walk,
                      color: Colors.white,
                    ),
                    onPressed: () => alertProvider.toggleMode(),
                  ),
                ),
              ),
              // Bottom overlay - Latest alerts
              Positioned(
                bottom: 20,
                left: 20,
                right: 20,
                child: GlassContainer(
                  height: 120,
                  child: alerts.isEmpty
                      ? const Center(
                          child: Text(
                            'No active alerts',
                            style: TextStyle(color: Colors.white),
                          ),
                        )
                      : ListView.builder(
                          scrollDirection: Axis.horizontal,
                          itemCount: alerts.length,
                          itemBuilder: (context, index) {
                            return Container(
                              width: 200,
                              margin: const EdgeInsets.only(right: 10),
                              child: AlertCard(alert: alerts[index]),
                            );
                          },
                        ),
                ),
              ),
              // Risk indicator
              Positioned(
                top: 120,
                right: 20,
                child: RiskIndicator(
                  riskLevel: alerts.isEmpty
                      ? 'LOW'
                      : alerts.any((a) => a.riskLevel == 'HIGH')
                          ? 'HIGH'
                          : alerts.any((a) => a.riskLevel == 'MED')
                              ? 'MED'
                              : 'LOW',
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}