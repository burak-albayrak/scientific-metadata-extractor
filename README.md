# Scientific Metadata Extractor

![Python Version](https://img.shields.io/badge/Python-3.9+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.1.1-green.svg)
![React](https://img.shields.io/badge/React-Latest-61dafb.svg)
![Gemini AI](https://img.shields.io/badge/Gemini%20AI-1.5-orange.svg)

A web application that automatically extracts structured metadata from scientific PDFs using Google's Gemini AI model.

🌐 **Live Demo**: [scientific-metadata-extractor.web.app](https://scientific-metadata-extractor.web.app)

## 🚀 Features

- **PDF Analysis**: Upload scientific papers and extract key metadata automatically
- **Drag & Drop Interface**: Modern UI for easy file management
- **Batch Processing**: Process multiple PDFs in sequence
- **Structured Results**: View extracted metadata in an organized layout
- **Responsive Design**: Works on desktop and mobile devices
- **Excel Export**: Extracted metadata can be downloaded as an Excel (.xlsx) file for each processed PDF

## 📋 Extracted Metadata

The system extracts the following metadata from scientific PDFs:

1. **DOI Number** – The Digital Object Identifier of the article
2. **Title** – The full title of the article
3. **Authors** – List of authors as presented in the article
4. **Purpose of the Article** – The main aim or objective of the research
5. **Key Findings** – The primary conclusions or results of the study
6. **Limitations** – Acknowledged limitations of the research
7. **Study Region** – Geographic location or population where the study was conducted
8. **Methodology** – Whether the study used a qualitative, quantitative, conceptual, or mixed approach
9. **Publication Year** – Year when the article was published
10. **Focused Topic** – The main subject or theme of the article
11. **Recommendations** – Any suggestions the authors make for future research, policy, or practice

If any item is not found in the text, the output states: "Not specified".

## 🏗️ Architecture

### Frontend

- Built with **React** and styled with **Tailwind CSS**
- Features a drag-and-drop interface for file uploads
- Displays file processing status and organized results
- Responsive design for all device sizes

### Backend

- **Flask** REST API
- PDF text extraction using **pdfminer.six** and **pdfplumber**
- Metadata extraction powered by **Google Gemini 1.5**
- Returns structured JSON data to the frontend

## 🔧 Installation

### Prerequisites

- Python 3.9+
- Node.js and npm
- Google AI API Key

### Backend Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/scientific-metadata-extractor.git
   cd scientific-metadata-extractor
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   # On Windows:
   .venv\Scripts\activate
   # On macOS/Linux:
   source .venv/bin/activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory:
   ```bash
   cd backend
   touch .env
   ```

5. Add your Google API key to the `.env` file:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```

6. Run the Flask server:
   ```bash
   python run_api.py
   ```
   The API will be available at `http://127.0.0.1:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## 🔄 Usage Flow

1. Open the web application in your browser
2. Upload PDF files by dragging and dropping them or using the file selector
3. Click the "Extract Metadata" button to start processing
4. Wait for the files to be processed (progress is shown)
5. View the structured metadata results for each document
6. Add or remove files as needed and repeat the process
7. For each processed PDF, click the "Download as Excel" button to save the extracted metadata as an Excel file

## 🌐 API Reference

### Extract Metadata

Extracts metadata from a PDF file.

- **URL:** `/api/extract`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Request Body:** 
  - `file`: PDF file

**Response:**
```json
{
  "doi": "10.1145/3283442",
  "title": "Using a Game Based Learning Approach in Teaching ISO/IEC 29110",
  "authors": ["Sanchez-Gordón, M.L.", "O'Connor, R.V.", "Colomo-Palacios, R."],
  "objective": "Evaluate a game-based learning tool for teaching ISO/IEC 29110 standard",
  "findings": "The game effectively supports learning and creates a positive experience",
  "limitations": "Limited sample size and single evaluation session",
  "study_region": "Academic setting in Spain",
  "methodology_type": "empirical",
  "publication_year": "2016",
  "focus_topic": "Software process improvement (SPI), ISO/IEC 29110 standard, Very Small Entities",
  "recommendations": "Not specified"
}
```

## 🛠️ Technology Stack

### Backend
- **Python 3.9+**: Core programming language
- **Flask**: Web framework for API
- **pdfminer.six & pdfplumber**: PDF text extraction
- **Google Generative AI**: Gemini 1.5 API for metadata extraction
- **python-dotenv**: Environment variable management

### Frontend
- **React**: UI library
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Fetch API**: Network requests

## 🔮 Future Enhancements

- **Export Options**: Download results as CSV, Excel, or JSON
- **Advanced PDF Processing**: Better handling of complex layouts and tables
- **User Accounts**: Save projects and results
- **Customizable Metadata Schemas**: Configurable extraction fields
- **Batch Upload Improvements**: Enhanced handling of large document collections
- **Citation Formatting**: Export citations in various formats (APA, MLA, etc.)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔍 Acknowledgments

- Google Gemini AI for powering the metadata extraction
- The open-source libraries that made this project possible

---

