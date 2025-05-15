# Prompt Template (Version 1)

You are an expert research assistant. Extract the following metadata from the provided scientific article text.

Return **only** valid JSON matching the exact schema below. Do not add any extra text or formatting.

<JSON_SCHEMA>

## Instructions

1. If a field is missing, write `"Not specified"`.
2. Use an array of strings for `"authors"`.
3. Ensure `"publication_year"` is an integer (e.g., 2022).
4. Do not add any explanation or extra description.
5. Do not use Markdown formatting.
6. Keep the keys exactly as provided in the schema.

## Input

ARTICLE_TEXT:

<ARTICLE_CONTENT>


## Notes

- `<JSON_SCHEMA>` will be inserted dynamically from the program.
- `<ARTICLE_CONTENT>` will be inserted dynamically from parsed PDF text (truncated to ~15,000 characters if necessary).


```
def build_prompt(article_text: str, json_schema: str) -> str:
    """
    Builds the full prompt by inserting the schema and article into template.
    """
    with open("docs/prompt_template.md", "r", encoding="utf-8") as f:
        template = f.read()

    # Token sınırını geçmemek için metni kes
    trimmed_text = article_text[:15000]

    return template.replace("<JSON_SCHEMA>", json_schema).replace("<ARTICLE_CONTENT>", trimmed_text)
```