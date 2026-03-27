import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class Alert {
  final String id;
  final String type; // accident, obstacle, road_issue
  final String alertLevel; // LOW, WARNING, CRITICAL
  final double trustScore;
  final String riskLevel; // HIGH, MED, LOW
  final double latitude;
  final double longitude;
  final DateTime timestamp;

  Alert({
    required this.id,
    required this.type,
    required this.alertLevel,
    required this.trustScore,
    required this.riskLevel,
    required this.latitude,
    required this.longitude,
    required this.timestamp,
  });

  factory Alert.fromFirestore(Map<String, dynamic> data, String id) {
    return Alert(
      id: id,
      type: data['type'] ?? '',
      alertLevel: data['alert_level'] ?? 'LOW',
      trustScore: (data['trust_score'] ?? 0.0).toDouble(),
      riskLevel: data['risk_level'] ?? 'LOW',
      latitude: data['latitude'] ?? 0.0,
      longitude: data['longitude'] ?? 0.0,
      timestamp: (data['timestamp'] as Timestamp?)?.toDate() ?? DateTime.now(),
    );
  }

  Color get color {
    switch (alertLevel) {
      case 'CRITICAL':
        return Colors.red;
      case 'WARNING':
        return Colors.orange;
      default:
        return Colors.grey;
    }
  }
}