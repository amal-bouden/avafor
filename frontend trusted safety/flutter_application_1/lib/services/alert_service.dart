import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/alert.dart';

class AlertService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Stream<List<Alert>> getAlerts() {
    return _firestore.collection('alerts').snapshots().map((snapshot) {
      return snapshot.docs.map((doc) => Alert.fromFirestore(doc.data(), doc.id)).toList();
    });
  }
}