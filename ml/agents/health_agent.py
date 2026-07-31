from typing import Dict, Any

class WaterQualityHealthAgent:
    """
    Sub-Agent 1 & 5: Evaluates Multi-Parameter Sensor Streams (pH, TDS, Turbidity, Temp)
    and computes Water Quality Index (WQI) and overall Health Scores.
    """
    
    def calculate_health_score(self, ph: float, tds: float, turbidity: float, temp: float) -> Dict[str, Any]:
        # Penalty weights
        ph_penalty = abs(ph - 7.2) * 15
        tds_penalty = max(0, (tds - 300) / 10)
        turbidity_penalty = max(0, (turbidity - 1.0) * 20)
        temp_penalty = max(0, (temp - 25.0) * 2)

        total_penalty = ph_penalty + tds_penalty + turbidity_penalty + temp_penalty
        health_score = max(0.0, min(100.0, 100.0 - total_penalty))

        status = "Healthy"
        if health_score < 50:
            status = "Critical"
        elif health_score < 75:
            status = "Warning"

        return {
            "health_score": round(health_score, 1),
            "status": status,
            "wqi": round(health_score * 0.95, 1),
            "penalties": {
                "ph": round(ph_penalty, 1),
                "tds": round(tds_penalty, 1),
                "turbidity": round(turbidity_penalty, 1),
                "temp": round(temp_penalty, 1)
            }
        }
