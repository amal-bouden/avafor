import 'package:flutter/material.dart';
import 'package:audioplayers/audioplayers.dart';

class RiskIndicator extends StatelessWidget {
  final String riskLevel;

  const RiskIndicator({super.key, required this.riskLevel});

  Future<void> _playClick() async {
    final player = AudioPlayer();
    await player.play(AssetSource('sounds/click.mp3'));
    await player.dispose();
  }

  @override
  Widget build(BuildContext context) {
    Color riskColor;
    switch (riskLevel) {
      case 'HIGH':
        riskColor = Colors.red;
        break;
      case 'MED':
        riskColor = Colors.orange;
        break;
      case 'LOW':
      default:
        riskColor = Colors.green;
        break;
    }

    return GestureDetector(
      onTap: _playClick,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: riskColor.withValues(alpha: 0.8),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.warning, color: Colors.white, size: 20),
            const SizedBox(width: 8),
            Text(
              'RISK: $riskLevel',
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
