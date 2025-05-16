# Metadata Fields & Definitions

| Field Name | Definition | Notes |
|------------|------------|-------|
| **doi** | Digital Object Identifier – the permanent, unique identifier assigned to the article. | Leave as `"Not specified"` if the article has none. |
| **title** | Full article title as printed in the publication. | Keep original capitalisation. |
| **authors** | Ordered list of author names. | Use `"Surname, Initials"` style. |
| **objective** | The primary aim / research question stated by the authors. | 1–2 sentences. |
| **findings** | Key results or findings reported in the paper. | Summarise succinctly. |
| **limitations** | Limitations or threats to validity acknowledged by the authors. | If absent, `"Not specified"`. |
| **study_region** | Geographic area, population, or dataset scope. | Examples: `"Global"`, `"Middle East"`, `"Dataset from USA"`. |
| **methodology_type** | Research approach (e.g., *empirical*, *qualitative*, *mixed methods*). | Choose the best fit; otherwise `"Not specified"`. |
| **publication_year** | Year the article was published. | Integer. |
| **focus_topic** | Main domain / theme of the research. | One short phrase. |
| **recommendations** | Authors’ practical or future-work recommendations. | Summarise or `"Not specified"`. |

> **Fallback rule:**  
> Any field that cannot be confidently extracted **must** be returned exactly as `"Not specified"`.