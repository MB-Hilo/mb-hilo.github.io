/**
 * Builds a region-specific static site.
 *
 *   node scripts/build-regional.js <emea|ca-us> <outDir>
 *
 * The site is a client component with runtime language switching, so all five
 * resume JSON files are bundled into the browser chunk. Filtering at render
 * time would therefore still ship the other region's numbers inside that
 * chunk. Instead we rewrite the JSON on disk, build, and restore the
 * originals, so the excluded numbers never enter the bundle at all.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const REGION_PHONE_LABELS = {
  emea: ['PT', 'DK'],
  'ca-us': ['CA'],
};

const [region, outDir] = process.argv.slice(2);
const labels = REGION_PHONE_LABELS[region];
if (!labels || !outDir) {
  console.error('usage: build-regional.js <emea|ca-us> <outDir>');
  process.exit(1);
}

const dataDir = path.join(__dirname, '../src/data');
const files = ['resume.json', 'resume.de.json', 'resume.es.json', 'resume.fr.json', 'resume.pt.json'];
const siteDir = path.resolve(__dirname, '..');
const backups = new Map();

function filterPhones(text) {
  const data = JSON.parse(text);
  const phones = data.personalInfo?.contact?.phones;
  if (!phones) return null;
  // Order by the region list so the local number leads.
  const kept = labels
    .map((label) => phones.find((p) => p.label === label))
    .filter(Boolean);
  if (kept.length === 0) return null;
  data.personalInfo.contact.phones = kept;
  // Match the existing files: 2-space indent, trailing newline, CRLF.
  return JSON.stringify(data, null, 2).replace(/\n/g, '\r\n') + '\r\n';
}

try {
  for (const f of files) {
    const p = path.join(dataDir, f);
    const original = fs.readFileSync(p, 'utf8');
    backups.set(p, original);
    const filtered = filterPhones(original);
    if (filtered) fs.writeFileSync(p, filtered);
  }

  fs.rmSync(path.join(siteDir, 'out'), { recursive: true, force: true });
  execFileSync('npx', ['next', 'build'], { cwd: siteDir, stdio: 'inherit', shell: true });

  const dest = path.join(siteDir, outDir);
  fs.rmSync(dest, { recursive: true, force: true });
  fs.renameSync(path.join(siteDir, 'out'), dest);
  console.log(`\n✓ ${region} site: ${dest}  (phones: ${labels.join(', ')})`);
} finally {
  // Always restore, even if the build throws.
  for (const [p, original] of backups) fs.writeFileSync(p, original);
  console.log('✓ restored original resume JSON files');
}
