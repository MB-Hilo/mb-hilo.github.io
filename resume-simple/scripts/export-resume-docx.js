// Builds public/Mark_Bradley_Resume.docx from src/data/resume.json.
// Plain single-column layout with no tables, text boxes or graphics, so ATS parsers read it cleanly.
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, AlignmentType,
  BorderStyle, TabStopType, LevelFormat, convertMillimetersToTwip,
} = require('docx');

const data = require('../src/data/resume.json');

const FONT = 'Arial';
const SERIF = 'Georgia';
const MUTED = '555555';
const RULE = 'D6D6D6';
const LINK = '1F3A68';
// Content width of A4 (210mm) minus 2 × 18mm margins, for the right-aligned date tab.
const RIGHT_TAB = convertMillimetersToTwip(210 - 36);

const run = (text, opts = {}) => new TextRun({ text, font: FONT, size: 20, ...opts });
const link = (text, url) =>
  new ExternalHyperlink({ link: url, children: [run(text, { size: 17, color: LINK })] });

function heading(text) {
  return new Paragraph({
    children: [run(text.toUpperCase(), { bold: true, size: 18, })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 2 } },
    spacing: { before: 380, after: 120 },
  });
}

// "Title | Company, Location ............ DATES"
function titleRow(title, rest, date) {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
    spacing: { before: 140, after: 40 },
    keepNext: true,
    children: [
      run(title, { bold: true }),
      run(` | ${rest}`, { color: MUTED }),
      run(`\t${date}`, { size: 17, color: MUTED }),
    ],
  });
}

const bullet = (text) =>
  new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 30 }, children: [run(text)] });

const { contact } = data;
const sep = () => run('  |  ', { size: 17, color: 'AAAAAA' });

// Two-column contact block without a table (ATS-safe): each line is
// "place | phone" (or the email) on the left, then a right tab and one link.
function contactLines() {
  const left = [
    ...contact.locations.map((l) => [run(l.place, { size: 17 }), sep(), run(l.phone, { size: 17 })]),
    [link(contact.email, `mailto:${contact.email}`)],
  ];
  const rows = Math.max(left.length, contact.links.length);
  const rule = { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 4 };
  return Array.from({ length: rows }, (_, i) => {
    const l = contact.links[i];
    return new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
      border: { ...(i === 0 && { top: rule }), ...(i === rows - 1 && { bottom: rule }) },
      children: [
        ...(left[i] ?? []),
        run('\t', { size: 17 }),
        ...(l ? [link(l.text, l.url)] : []),
      ],
    });
  });
}

const children = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: data.name, font: SERIF, size: 52 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 160 },
    children: [new TextRun({ text: data.headline, font: SERIF, size: 24, italics: true, color: MUTED })],
  }),
  ...contactLines(),

  heading('Profile'),
  new Paragraph({ alignment: AlignmentType.JUSTIFIED, children: [run(data.summary)] }),

  heading('Experience'),
  ...data.experience.flatMap((job) => [
    titleRow(job.title, `${job.company}, ${job.location}`, `${job.start} – ${job.end}`),
    ...job.bullets.map(bullet),
  ]),

  heading('Skills'),
  ...data.skills.map(
    (s) =>
      new Paragraph({
        tabStops: [{ type: TabStopType.LEFT, position: convertMillimetersToTwip(32) }],
        indent: { left: convertMillimetersToTwip(32), hanging: convertMillimetersToTwip(32) },
        spacing: { after: 40 },
        children: [run(s.label, { bold: true }), run(`\t${s.items}`)],
      })
  ),

  heading('Education'),
  ...data.education.map((e) => titleRow(e.name, e.school, e.year)),
];

const doc = new Document({
  creator: data.name,
  title: `${data.name} — Resume`,
  numbering: {
    config: [{
      reference: 'bullets',
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: '•',
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 240 } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: convertMillimetersToTwip(210), height: convertMillimetersToTwip(297) },
        margin: {
          top: convertMillimetersToTwip(14), bottom: convertMillimetersToTwip(14),
          left: convertMillimetersToTwip(18), right: convertMillimetersToTwip(18),
        },
      },
    },
    children,
  }],
});

const outDir = path.join(__dirname, '../public');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'Mark_Bradley_Resume.docx');

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outFile, buf);
  console.log(`Wrote ${outFile}`);
});
