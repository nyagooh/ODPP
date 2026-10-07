# ODPP RAG — prototype

Design concept for a search-and-answer research tool for Kenya's Office of the Director of Public Prosecutions. Not an official service. All answers, page numbers and some document details are sample content; bracketed values such as `[SECTION]` are placeholders for real ODPP data.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Routes (core flow, pass one)

| Route | Screen |
| --- | --- |
| `/` | Public landing |
| `/research/[slug]` | Public answer (top nav, no sidebar) |
| `/read/[doc]` | Public document reader |
| `/ask` | Staff: Ask, empty |
| `/ask/[slug]?fresh=1` | Staff: processing, then answer |
| `/ask/[slug]?cite=1` | Staff: citation split view |
| `/library/[doc]?page=98&from=[slug]&cite=1` | Staff: document reader |

`/library`, `/search` and `/documents` are stubs for the next pass.

## Structure

- `lib/content.ts`: sample documents, pages, citations and answers
- `styles/base.css`: tokens (navy `#001854`, gold `#F2B82E`, crimson `#BA2126`), type, buttons, motion
- `styles/system.css`: the signature system (citation numbers + rules, composer, cited passages)
- `styles/public.css`, `styles/app.css`: public layer and staff workspace
- `components/research/*`: processing, answer, sources, split view
- `components/reader/*`: document reader
