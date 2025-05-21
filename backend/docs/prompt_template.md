# Prompt Template (Version 2)

You are an expert research assistant. Extract the following metadata from the provided scientific article text.

Return **only** valid JSON matching the exact schema below. Do not add any extra text or formatting.

<JSON_SCHEMA>

## Instructions

1. **IMPORTANT**: If a field is present in the text but not under a specific heading, you must still extract and return it. Look for implicit mentions or related content.
2. If a field is not explicitly labeled but the information exists in the text (e.g., country names for study_region, limitations mentioned in discussion), extract it from context.
3. Only use "Not specified" when you are certain the information is completely absent from the text.
4. Use an array of strings for "authors".
5. Ensure "publication_year" is an integer (e.g., 2022).
6. Do not add any explanation or extra description.
7. Do not use Markdown formatting.
8. Keep the keys exactly as provided in the schema.

## Examples of Implicit Information
- If authors discuss "conducting interviews in Spain" but never explicitly say "study region: Spain", still extract "Spain" as the study_region.
- If text mentions "small sample size limited our findings", extract this as a limitation even if not in a "Limitations" section.
- If researchers suggest "future work should explore X", include this in recommendations even without a dedicated section.

## Input

ARTICLE_TEXT:

<ARTICLE_CONTENT>

## Important Reminder
Return ONLY valid JSON. Do not include any explanation or commentary before or after the JSON.