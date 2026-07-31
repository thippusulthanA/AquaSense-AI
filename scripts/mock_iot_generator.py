import time
import random
import requests

API_URL = "http://localhost:8000/api/v1/sensors/ingest"

def run_mock_iot_stream():
    print("📡 ESP32 IoT Node Simulator broadcasting telemetry stream to AquaSense-AI...")
    sensors = ["SENS-PH-01", "SENS-TDS-01", "SENS-TURB-01", "SENS-FLOW-01"]
    
    for _ in range(5):
        sensor_code = random.choice(sensors)
        val = random.uniform(6.8, 7.8) if "PH" in sensor_code else random.uniform(1.0, 3.0)
        payload = {"sensor_code": sensor_code, "value": round(val, 2)}
        
        try:
            res = requests.post(API_URL, json=payload, timeout=2)
            print(f"Sent {payload} -> Status {res.status_code}")
        except Exception as e:
            print(f"Simulated local send: {payload} (Backend offline or testing mode)")
        time.sleep(1)

if __name__ == "__main__":
    run_mock_iot_stream()
