# Resume Site - React to Static HTML Generator

A Next.js-based resume website that generates static HTML from React components and JSON data, optimized for print and PDF export.

## Features

- 📄 **JSON-driven content**: All resume data is stored in `src/data/resume.json`
- 🖨️ **Print-friendly**: Optimized CSS for printing and PDF export
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- 🚀 **Static export**: Generates static HTML for GitHub Pages
- ⚡ **TypeScript**: Fully typed components and data structures

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Serve static files locally**:
   ```bash
   npm run serve
   ```

## Customizing Your Resume

Edit `src/data/resume.json` to update your resume content. The JSON structure includes:

- `personalInfo`: Name, title, and contact information
- `profile`: Professional summary
- `skills`: Technical and soft skills with levels
- `languages`: Spoken languages
- `experience`: Work history with achievements
- `education`: Educational background

## Print/PDF Export

The site is optimized for printing:

1. Open the website in your browser
2. Press `Ctrl+P` (or `Cmd+P` on Mac)
3. Select "Save as PDF" or print to paper
4. The layout will automatically adjust for A4 size with proper margins

## Deployment to GitHub Pages

The project includes GitHub Actions workflow for automatic deployment:

1. Push to the `main` branch
2. GitHub Actions will build and deploy to GitHub Pages
3. Enable Pages in repository settings

## File Structure

```
resume-site/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page component
│   │   └── globals.css       # Global styles with print optimization
│   ├── components/
│   │   ├── Sidebar.tsx       # Contact info and skills
│   │   └── MainContent.tsx   # Experience and education
│   ├── data/
│   │   └── resume.json       # Resume content data
│   └── types/
│       └── resume.ts         # TypeScript interfaces
├── .github/workflows/
│   └── deploy.yml           # GitHub Pages deployment
└── next.config.ts           # Next.js static export configuration
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build static site
- `npm run serve` - Serve built files locally
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 15** - React framework with static export
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with print optimizations
- **Inter Font** - Clean, professional typography

Have fun
