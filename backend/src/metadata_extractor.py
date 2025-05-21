from pathlib import Path
from typing import Dict
import json

from .pdf_parser import extract_text
from .llm_client import query_llm
from .utils.io import load_json_schema, build_prompt


def extract_metadata(pdf_path: Path) -> Dict:
    """
    Extract structured metadata from a single PDF.

    Returns
    -------
    Dict
        JSON-parsed metadata from Gemini.
    """
    print(f"[INFO] Extracting text from: {pdf_path.name}")
    raw_text = extract_text(pdf_path)

    print(f"[INFO] Building prompt...")
    schema_str = load_json_schema()
    prompt = build_prompt(raw_text, schema_str)

    print(f"[INFO] Querying Gemini...")
    response = query_llm(prompt)

    # 🔧 Remove Markdown-style code block (```json ... ```)
    if response.startswith("```json") or response.startswith("```"):
        response = response.strip()
        response = response.removeprefix("```json").removeprefix("```").removesuffix("```").strip()

    try:
        # Remove any markdown code blocks or extra text
        if response.startswith("```json") or response.startswith("```"):
            response = response.strip()
            response = response.removeprefix("```json").removeprefix("```").removesuffix("```").strip()

        # Handle potential trailing or leading text
        # Find the first { and last } to isolate the JSON
        start_idx = response.find('{')
        end_idx = response.rfind('}')

        if start_idx >= 0 and end_idx >= 0:
            response = response[start_idx:end_idx + 1]

        result = json.loads(response)
    except json.JSONDecodeError as e:
        raise ValueError(f"LLM did not return valid JSON: {e}\n\nRaw response:\n{response}")

    return result