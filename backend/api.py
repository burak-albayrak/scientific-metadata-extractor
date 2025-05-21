from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pathlib import Path
import tempfile
import pandas as pd
import os

from src.metadata_extractor import extract_metadata

app = Flask(__name__)
CORS(app)

@app.route("/api/extract", methods=["POST"])
def extract():
    """
    Receive a PDF file via POST, extract metadata using Gemini, and return JSON.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    uploaded_file = request.files['file']
    if uploaded_file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    # Save to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        uploaded_file.save(tmp.name)
        pdf_path = Path(tmp.name)

    try:
        metadata = extract_metadata(pdf_path)
        return jsonify(metadata)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/extract_excel", methods=["POST"])
def extract_excel():
    """
    Receive a PDF file via POST, extract metadata, and return as Excel file.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    uploaded_file = request.files['file']
    if uploaded_file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    # Save to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        uploaded_file.save(tmp.name)
        pdf_path = Path(tmp.name)

    try:
        metadata = extract_metadata(pdf_path)
        # Convert to DataFrame and save as Excel
        df = pd.DataFrame([metadata])
        with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp_xlsx:
            df.to_excel(tmp_xlsx.name, index=False)
            tmp_xlsx.flush()
            tmp_xlsx_path = tmp_xlsx.name
        response = send_file(tmp_xlsx_path, as_attachment=True, download_name="extracted_metadata.xlsx", mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        # Clean up temp files after sending
        @response.call_on_close
        def cleanup():
            try:
                os.remove(tmp_xlsx_path)
                os.remove(pdf_path)
            except Exception:
                pass
        return response
    except Exception as e:
        import traceback
        print('EXCEL ERROR:', e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500