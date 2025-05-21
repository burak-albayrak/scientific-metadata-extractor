# Metadata Fields & Definitions

| Field Name | Definition | Notes |
|------------|------------|-------|
| **doi** | Digital Object Identifier – the permanent, unique identifier assigned to the article. | Leave as "Not specified" if the article has none. |
| **title** | Full article title as printed in the publication. | Keep original capitalisation. |
| **authors** | Ordered list of author names. | Use "Surname, Initials" style. |
| **objective** | The primary aim / research question stated by the authors. | 1–2 sentences. |
| **findings** | Key results or findings reported in the paper. | Summarise succinctly. |
| **limitations** | Limitations or threats to validity acknowledged by the authors. | Extract even if not in a dedicated section. |
| **study_region** | Where the study took place or dataset originated.  | Look for any mentions of countries, regions, dataset origins, or institution location. If institution location is present, use it as study_region. |
| **methodology_type** | Research approach (e.g., *empirical*, *qualitative*, *mixed methods*). | Infer from methods description if not explicitly stated. |
| **publication_year** | The year of publication. | Integer. Look in header/footer if not in main text. |
| **focus_topic** | Main domain / theme of the research. | Summarize the primary subject area. |
| **recommendations** | Authors' practical or future-work recommendations. | Extract from conclusion or discussion sections even if not labeled as recommendations. |

> **Extraction rule:**  
> Fields should be extracted even when they appear implicitly in the text. Only mark as "Not specified" when the information is completely absent.
> Do **not** skip fields just because they lack a section heading.  
> Extract information **even if it appears indirectly or is embedded in narrative text**.  
> Only return `"Not specified"` if there is genuinely no relevant content.