# Output Specification

## JSON Output Format (Per Article)

Each processed article should return a JSON object with the following structure:

```json
{
  "doi": "10.1234/example.doi",
  "title": "Article Title",
  "authors": ["Author One", "Author Two"],
  "objective": "Short summary of the research objective.",
  "findings": "Key findings or results of the paper.",
  "limitations": "Limitations or constraints of the study.",
  "study_region": "Geographic or contextual focus, if any.",
  "methodology_type": "empirical | qualitative | quantitative | literature review | Not specified",
  "publication_year": 2025,
  "focus_topic": "Main theme or topic of the article.",
  "recommendations": "Any suggestions made by the authors."
}
```

- Missing or unavailable fields must be filled as "Not specified".
- “authors” must always be an array of strings.
- “publication_year” must be an integer (e.g., 2025).
