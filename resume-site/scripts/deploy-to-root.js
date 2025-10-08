const fs = require('fs');
const path = require('path');

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Function to clean root directory (except resume-site folder and git files)
function cleanRoot(rootDir) {
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  
  for (let entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    
    // Skip these important directories/files
    if (entry.name === 'resume-site' || 
        entry.name === '.git' || 
        entry.name === '.gitignore' ||
        entry.name === 'README.md' ||
        entry.name === 'CNAME') {
      continue;
    }
    
    // Remove everything else
    if (entry.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(fullPath);
    }
  }
}

async function deploy() {
  const resumeSiteDir = path.resolve(__dirname, '..');
  const rootDir = path.resolve(resumeSiteDir, '..');
  const outDir = path.join(resumeSiteDir, 'out');
  
  console.log('🚀 Starting deployment to root directory...');
  console.log(`📁 Resume site directory: ${resumeSiteDir}`);
  console.log(`📁 Root directory: ${rootDir}`);
  console.log(`📁 Out directory: ${outDir}`);
  
  // Check if out directory exists
  if (!fs.existsSync(outDir)) {
    console.error('❌ No out directory found. Please run "npm run build" first.');
    console.error(`   Expected: ${outDir}`);
    process.exit(1);
  }
  
  // Clean root directory
  console.log('🧹 Cleaning root directory...');
  cleanRoot(rootDir);
  
  // Copy built files to root
  console.log('📁 Copying built files to root...');
  copyDir(outDir, rootDir);
  
  // Create .nojekyll file for GitHub Pages
  const nojekyllPath = path.join(rootDir, '.nojekyll');
  fs.writeFileSync(nojekyllPath, '');
  
  console.log('✅ Deployment complete!');
  console.log('📝 Next steps:');
  console.log('   1. Commit and push the changes to GitHub');
  console.log('   2. Enable GitHub Pages in repository settings');
  console.log('   3. Set source to "Deploy from a branch" and select "main" branch');
  console.log('   4. Your resume will be available at: https://mb-hilo.github.io');
}

deploy().catch(console.error);