# Resume (simple)

A one-page, single-column version of `../resume-site`, built for fast human scanning and clean ATS parsing:
no sidebar, charts, icons or colour blocks.

All content lives in `src/data/resume.json`. Edit it per application (headline, summary and bullet
order) to match the job description's wording.

```bash
npm install
npm run dev          # http://localhost:3000
npm run export:docx  # writes public/Mark_Bradley_Resume.docx
npm run build        # docx + static site in out/
```

**PDF:** open the page in Chrome → Ctrl+P → Save as PDF (A4, margins "Default", headers/footers off).
Keep it to one page; if it spills over, shorten bullets rather than shrinking the font.
