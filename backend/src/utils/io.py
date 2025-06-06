from pathlib import Path
import json


def load_json_schema(schema_path: Path = None) -> str:
    """
    Extract JSON schema block from markdown file.
    """
    if schema_path is None:
        base_dir = Path(__file__).resolve().parents[2]  # backend/src/utils → project root
        schema_path = base_dir / "docs" / "output_spec.md"

    in_block = False
    lines = []

    with open(schema_path, "r", encoding="utf-8") as f:
        for line in f:
            if line.strip().startswith("```json"):
                in_block = True
                continue
            elif line.strip().startswith("```") and in_block:
                break
            if in_block:
                lines.append(line.rstrip())

    return "\n".join(lines)


def build_prompt(article_text: str, json_schema: str) -> str:
    """
    Builds the full prompt by inserting the schema and article into the prompt template.
    """
    template_path = Path(__file__).resolve().parent.parent.parent / "docs" / "prompt_template.md"
    with open(template_path, "r", encoding="utf-8") as f:
        template = f.read()

    trimmed_text = article_text[:15000]
    return template.replace("<JSON_SCHEMA>", json_schema).replace("<ARTICLE_CONTENT>", trimmed_text)