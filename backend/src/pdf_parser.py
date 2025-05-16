from pathlib import Path
from typing import List

import pdfplumber


def extract_text(pdf_path: Path) -> str:
    """
    Extracts plain text from a PDF file.

    Parameters
    ----------
    pdf_path : Path
        Path to the PDF file.

    Returns
    -------
    str
        Concatenated text of all pages with line-break cleanup.
    """
    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    full_text: List[str] = []

    with pdfplumber.open(str(pdf_path)) as pdf:
        for page in pdf.pages:
            # Extract with layout=False to avoid additional spaces
            page_text = page.extract_text(x_tolerance=1, y_tolerance=1) or ""
            # Basic cleanup: collapse multiple spaces, strip leading/trailing
            cleaned = " ".join(page_text.split())
            full_text.append(cleaned)

    # Join pages with two newlines so abstracts / sections stay separable
    return "\n\n".join(full_text)