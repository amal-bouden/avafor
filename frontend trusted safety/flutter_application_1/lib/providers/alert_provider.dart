import 'package:flutter/material.dart';
import '../models/alert.dart';
import '../services/alert_service.dart';

class AlertProvider with ChangeNotifier {
  final AlertService _alertService = AlertService();
  List<Alert> _alerts = [];
  bool _isDriverMode = true;

  List<Alert> get alerts => _alerts;
  bool get isDriverMode => _isDriverMode;

  AlertProvider() {
    _listenToAlerts();
  }

  void _listenToAlerts() {
    _alertService.getAlerts().listen((alerts) {
      _alerts = alerts;
      notifyListeners();
    });
  }

  void toggleMode() {
    _isDriverMode = !_isDriverMode;
    notifyListeners();
  }
}