# GitHub Pages Deployment Guide

This resume site is configured to deploy to the root of your GitHub Pages repository (`mb-hilo.github.io`).

## Quick Deployment

1. **Build and deploy to root:**
   ```bash
   cd resume-site
   npm run deploy
   ```

2. **Commit and push changes:**
   ```bash
   git add .
   git commit -m "Deploy resume site to root"
   git push origin main
   ```

3. **Configure GitHub Pages:**
   - Go to repository Settings → Pages
   - Set source to "Deploy from a branch"
   - Select "main" branch and "/" (root) folder
   - Save settings

4. **Access your resume:**
   Your resume will be available at: https://mb-hilo.github.io

## Development Workflow

### Local Development
```bash
cd resume-site
npm run dev
```
Access at: http://localhost:3000

### Build Only
```bash
cd resume-site
npm run build
```
Output goes to `resume-site/out/`

### Serve Built Files Locally
```bash
cd resume-site
npm run serve
```

## File Structure After Deployment

```
mb-hilo.github.io/
├── resume-site/          # Source code (React/Next.js)
├── index.html           # Built resume homepage
├── _next/               # Next.js assets
├── 404.html            # 404 page
├── .nojekyll           # GitHub Pages config
└── ...                 # Other built assets
```

## Automatic Deployment

GitHub Actions will automatically:
1. Build the resume site
2. Deploy files to root directory
3. Update GitHub Pages

Triggered on pushes to `main` or `master` branch.

## Customization

To update resume content:
1. Edit `src/data/resume.json`
2. Run `npm run deploy`
3. Commit and push changes

## Troubleshooting

**Issue**: Changes not showing on GitHub Pages
- Wait 5-10 minutes for GitHub Pages to update
- Check GitHub Actions tab for deployment status
- Ensure `.nojekyll` file exists in root

**Issue**: 404 errors for assets
- Verify Next.js config has no `basePath` or `assetPrefix`
- Check that files are in root directory after deployment

**Issue**: Build fails
- Run `npm run lint` to check for code issues
- Ensure all dependencies are installed with `npm install`