from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pathlib import Path
import tempfile
import pandas as pd
import os

from src.metadata_extractor import extract_metadata

app = Flask(__name__)
CORS(app, origins=os.getenv("CORS_ALLOW_ORIGINS", "*").split(","))

@app.route("/")
def index():
    return "Scientific Metadata Extractor API is running"

@app.route("/api/extract", methods=["POST"])
def extract():
    print("\n[INFO] Received request at /api/extract")

    if 'file' not in request.files:
        print("[ERROR] No file part in request")
        return jsonify({"error": "No file uploaded"}), 400

    uploaded_file = request.files['file']
    if uploaded_file.filename == '':
        print("[ERROR] Empty filename")
        return jsonify({"error": "Empty filename"}), 400

    print(f"[INFO] Received file: {uploaded_file.filename}")

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        uploaded_file.save(tmp.name)
        pdf_path = Path(tmp.name)
        print(f"[INFO] File saved to temporary path: {pdf_path}")

    try:
        metadata = extract_metadata(pdf_path)
        print(f"[SUCCESS] Metadata extracted: {metadata}")
        return jsonify(metadata)
    except Exception as e:
        import traceback
        print("[EXCEPTION] Metadata extraction failed:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/api/extract_excel", methods=["POST"])
def extract_excel():
    print("\n[INFO] Received request at /api/extract_excel")

    if 'file' not in request.files:
        print("[ERROR] No file part in request")
        return jsonify({"error": "No file uploaded"}), 400

    uploaded_file = request.files['file']
    if uploaded_file.filename == '':
        print("[ERROR] Empty filename")
        return jsonify({"error": "Empty filename"}), 400

    print(f"[INFO] Received file: {uploaded_file.filename}")

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        uploaded_file.save(tmp.name)
        pdf_path = Path(tmp.name)
        print(f"[INFO] File saved to temporary path: {pdf_path}")

    try:
        metadata = extract_metadata(pdf_path)
        print(f"[INFO] Metadata extracted: {metadata}")

        df = pd.DataFrame([metadata])
        with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp_xlsx:
            df.to_excel(tmp_xlsx.name, index=False)
            tmp_xlsx.flush()
            tmp_xlsx_path = tmp_xlsx.name
            print(f"[INFO] Excel file saved to: {tmp_xlsx_path}")

        response = send_file(tmp_xlsx_path, as_attachment=True,
                             download_name="extracted_metadata.xlsx",
                             mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")

        @response.call_on_close
        def cleanup():
            print("[INFO] Cleaning up temporary files")
            try:
                os.remove(tmp_xlsx_path)
                os.remove(pdf_path)
                print("[INFO] Cleanup complete")
            except Exception as cleanup_error:
                print("[WARNING] Cleanup failed:", cleanup_error)

        return response
    except Exception as e:
        import traceback
        print("[EXCEPTION] Excel extraction failed:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500