from flask import Flask, request, jsonify
from flask_cors import CORS
from pathlib import Path
import tempfile

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