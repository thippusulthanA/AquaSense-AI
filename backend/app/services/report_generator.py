import os
import csv
from datetime import datetime
from app.core.config import settings

class ReportGeneratorService:
    @staticmethod
    def generate_csv_report(filename_prefix: str, data: list, headers: list) -> str:
        os.makedirs(settings.REPORT_DIR, exist_ok=True)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{filename_prefix}_{timestamp}.csv"
        filepath = os.path.join(settings.REPORT_DIR, filename)

        with open(filepath, mode="w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(headers)
            for row in data:
                writer.writerow(row)
        return filepath
