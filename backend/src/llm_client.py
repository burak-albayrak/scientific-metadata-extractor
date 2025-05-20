"""
llm_client.py
-------------
Wrapper for Gemini (Google Generative AI) using google-generativeai library.
"""

import os
from dotenv import load_dotenv
import google.generativeai as genai
from typing import Optional

# Load environment variables from .env file
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise EnvironmentError("GOOGLE_API_KEY is not set in the environment.")

# Configure Gemini client
genai.configure(api_key=GOOGLE_API_KEY)

# Choose the model (Flash = fast, 1M context)
MODEL = "gemini-1.5-flash"


def query_llm(prompt: str, model: Optional[str] = MODEL) -> str:
    """
    Sends a prompt to Gemini and returns the generated response text.

    Parameters
    ----------
    prompt : str
        Plain text prompt (must include the JSON schema and article text).
    model : str, optional
        Gemini model name (default is gemini-1.5-flash).

    Returns
    -------
    str
        The model's raw response (as a string, expected to be JSON).
    """
    try:
        gemini_model = genai.GenerativeModel(model)
        response = gemini_model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        raise RuntimeError(f"Gemini API error: {e}") from e