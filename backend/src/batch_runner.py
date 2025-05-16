from pathlib import Path
from typing import List
import pandas as pd
from tqdm import tqdm

from .metadata_extractor import extract_metadata


def extract_all(pdf_dir: Path) -> pd.DataFrame:
    """
    Iterate over all PDFs in a directory and build a DataFrame.

    Parameters
    ----------
    pdf_dir : Path
        Directory containing PDF files.

    Returns
    -------
    pd.DataFrame
        Aggregated metadata for all processed articles.
    """
    results = []

    pdf_files = list(pdf_dir.glob("*.pdf"))
    print(f"[INFO] Found {len(pdf_files)} PDF files in {pdf_dir}")

    for pdf_path in tqdm(pdf_files, desc="Processing PDFs"):
        try:
            metadata = extract_metadata(pdf_path)
            metadata["source_file"] = pdf_path.name  # Ek olarak hangi dosyadan geldiği
            results.append(metadata)
        except Exception as e:
            print(f"[WARN] Skipped {pdf_path.name} due to error: {e}")
            continue

    df = pd.DataFrame(results)
    return df