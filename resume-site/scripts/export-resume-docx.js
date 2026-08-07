// Generates Mark_Bradley_Resume.docx from resume.json
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, Table, TableRow, TableCell,
  WidthType, ShadingType, Header, PageNumber, NumberFormat,
  UnderlineType, convertInchesToTwip, TabStopPosition, TabStopType,
} = require('docx');
const fs = require('fs');
const path = require('path');

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/resume.json'), 'utf8')
);

// ─── Colours & constants ─────────────────────────────────────────────────────
const DARK  = '1A1A2E';   // deep navy  (headings / name)
const MID   = '16213E';   // mid navy   (section bars)
const ACCENT = '0F3460';  // accent blue
const LIGHT  = '4A4A6A';  // muted text
const WHITE  = 'FFFFFF';
const RULE   = 'D0D0E0';

const BODY_FONT  = 'Calibri';
const HEAD_FONT  = 'Calibri';
const PAGE_W     = convertInchesToTwip(8.5);
const PAGE_H     = convertInchesToTwip(11);
const MARGIN     = convertInchesToTwip(0.75);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hr() {
  return new Paragraph({
    border: { bottom: { color: RULE, space: 1, style: BorderStyle.SINGLE, size: 6 } },
    spacing: { before: 80, after: 80 },
  });
}

function sectionHeading(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        color: WHITE,
        size: 20,
        font: HEAD_FONT,
        allCaps: true,
      }),
    ],
    shading: { type: ShadingType.SOLID, color: MID, fill: MID },
    spacing: { before: 240, after: 120 },
    indent: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
    alignment: AlignmentType.LEFT,
  });
}

function jobTitle(title, company, period, location) {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: title, bold: true, size: 22, font: BODY_FONT, color: DARK }),
        new TextRun({ text: '  •  ', size: 22, font: BODY_FONT, color: LIGHT }),
        new TextRun({ text: company, bold: true, size: 22, font: BODY_FONT, color: ACCENT }),
      ],
      spacing: { before: 160, after: 20 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: period, italics: true, size: 18, font: BODY_FONT, color: LIGHT }),
        location ? new TextRun({ text: `   |   ${location}`, size: 18, font: BODY_FONT, color: LIGHT }) : new TextRun(''),
      ],
      spacing: { before: 0, after: 60 },
    }),
  ];
}

function bullet(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 18, font: BODY_FONT, color: '2D2D2D' })],
    bullet: { level: 0 },
    spacing: { before: 30, after: 30 },
  });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: opts.size || 18, font: BODY_FONT, color: opts.color || '2D2D2D', italics: opts.italics })],
    spacing: { before: opts.before || 60, after: opts.after || 60 },
  });
}

// ─── Build sections ───────────────────────────────────────────────────────────

function buildHeader() {
  const { name, title } = data.personalInfo;
  const { email, linkedin, consulting, website, nationality, residence, phones } = data.personalInfo.contact;

  const phoneParts = (phones || []).map(p => `${p.label} ${p.number}`);
  const contactParts = [email, ...phoneParts, linkedin, consulting, website].filter(Boolean);

  return [
    new Paragraph({
      children: [
        new TextRun({ text: name, bold: true, size: 52, font: HEAD_FONT, color: DARK }),
      ],
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: title, size: 24, font: HEAD_FONT, color: ACCENT }),
      ],
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      children: contactParts.map((p, i) => new TextRun({
        text: i < contactParts.length - 1 ? `${p}   |   ` : p,
        size: 17,
        font: BODY_FONT,
        color: LIGHT,
      })),
      spacing: { before: 0, after: 40 },
    }),
    nationality || residence ? new Paragraph({
      children: [
        nationality ? new TextRun({ text: `Nationality: ${nationality}`, size: 17, font: BODY_FONT, color: LIGHT }) : new TextRun(''),
        nationality && residence ? new TextRun({ text: '   |   ', size: 17, font: BODY_FONT, color: LIGHT }) : new TextRun(''),
        residence ? new TextRun({ text: `Based in: ${residence}`, size: 17, font: BODY_FONT, color: LIGHT }) : new TextRun(''),
      ],
      spacing: { before: 0, after: 80 },
    }) : null,
    hr(),
  ].filter(Boolean);
}

function buildProfile() {
  return [
    sectionHeading('Profile'),
    bodyText(data.profile, { size: 18, before: 100, after: 80 }),
  ];
}

function buildExperience() {
  const paragraphs = [sectionHeading('Experience')];
  for (const job of data.experience) {
    paragraphs.push(...jobTitle(job.title, job.company, job.period, job.location));
    for (const ach of job.achievements) {
      paragraphs.push(bullet(ach));
    }
  }
  return paragraphs;
}

function buildSkills() {
  const paras = [sectionHeading('Technical Skills')];

  // Group detailed skills as a two-column-ish bullet list
  paras.push(bodyText('Core technologies and proficiency areas:', { size: 17, italics: true, before: 80, after: 40 }));

  for (const skill of data.skills.detailedTechnical) {
    paras.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${skill.name}`, bold: true, size: 18, font: BODY_FONT, color: DARK }),
          new TextRun({ text: `  (${skill.experience})`, size: 17, font: BODY_FONT, color: LIGHT }),
        ],
        bullet: { level: 0 },
        spacing: { before: 60, after: 20 },
      })
    );
    if (skill.details) {
      for (const d of skill.details) {
        paras.push(
          new Paragraph({
            children: [new TextRun({ text: d, size: 17, font: BODY_FONT, color: '4A4A4A' })],
            bullet: { level: 1 },
            spacing: { before: 20, after: 20 },
          })
        );
      }
    }
  }
  return paras;
}

function buildEducation() {
  const paras = [sectionHeading('Education')];
  for (const ed of data.education) {
    paras.push(bullet(ed));
  }
  return paras;
}

function buildLanguagesAndHobbies() {
  const paras = [sectionHeading('Languages & Interests')];
  paras.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Languages: ', bold: true, size: 18, font: BODY_FONT, color: DARK }),
        new TextRun({ text: data.languages.join('   |   '), size: 18, font: BODY_FONT, color: '2D2D2D' }),
      ],
      spacing: { before: 80, after: 60 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Interests: ', bold: true, size: 18, font: BODY_FONT, color: DARK }),
        new TextRun({ text: data.hobbies.join('   |   '), size: 18, font: BODY_FONT, color: '2D2D2D' }),
      ],
      spacing: { before: 0, after: 80 },
    })
  );
  return paras;
}

// ─── Assemble document ────────────────────────────────────────────────────────

const doc = new Document({
  numbering: {
    config: [
      {
        reference: 'default-bullet',
        levels: [
          {
            level: 0,
            format: NumberFormat.BULLET,
            text: '•',
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: { indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.15) } },
            },
          },
          {
            level: 1,
            format: NumberFormat.BULLET,
            text: '◦',
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: { indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.15) } },
            },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: PAGE_W, height: PAGE_H },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
        },
      },
      children: [
        ...buildHeader(),
        ...buildProfile(),
        ...buildExperience(),
        ...buildSkills(),
        ...buildEducation(),
        ...buildLanguagesAndHobbies(),
      ],
    },
  ],
});

const outPath = path.join(__dirname, '../public/Mark_Bradley_Resume.docx');
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log(`✓ Exported: ${outPath}`);
});