# CLAUDE.md - Ruichi Xiong Personal Website

## Project Overview

Personal academic website for Ruichi Xiong, Assistant Professor at Wuhan University.
Built with Jekyll using the al-folio theme, hosted on GitHub Pages at https://ruichixiong.com

## Technology Stack

- **Framework**: Jekyll (Ruby-based static site generator)
- **Theme**: al-folio (academic-focused)
- **Hosting**: GitHub Pages
- **Domain**: Custom domain (ruichixiong.com) via CNAME

## Repository Structure

```
├── _config.yml          # Site configuration, theme settings
├── _pages/              # Main content pages
│   ├── about.md         # Homepage (root)
│   └── research.md      # Research/papers page
├── _data/               # Data files
│   ├── coauthors.yml    # Co-author links
│   ├── repositories.yml # GitHub repos (unused)
│   └── venues.yml       # Publication venues
├── _projects/           # Project pages (empty)
├── _sass/               # SCSS stylesheets
│   ├── _base.scss       # Typography, base styles
│   ├── _layout.scss     # Layout components
│   ├── _themes.scss     # Color themes
│   └── _variables.scss  # Color variables
├── assets/
│   ├── img/             # Images (profile photo)
│   ├── pdf/             # PDFs (CV, papers)
│   ├── js/              # JavaScript files
│   └── css/             # Compiled CSS
├── scripts/             # Build/utility scripts
│   └── generate-cv.js   # CV PDF generation script
├── _includes/           # HTML partials
├── _layouts/            # Page layouts
└── _site/               # Generated site (gitignored)
```

## Key Configuration

### _config.yml Important Settings

```yaml
# Site identity
first_name: Ruichi
last_name: Xiong
url: https://RuichiXiong.github.io

# Theme settings (light mode only)
enable_darkmode: false
enable_math: true
enable_medium_zoom: true
last_updated: true

# SEO
enable_google_verification: true
serve_og_meta: true
serve_schema_org: true
```

## Content Management

### Homepage (_pages/about.md)
- Profile photo: `assets/img/home.jpg`
- Contact info in frontmatter `address:` field
- Bio text in markdown body

### Research Page (_pages/research.md)
Manually maintained list (no bibliography plugin):
- Working Papers section
- Publications section
- Paper titles link to PDFs in `assets/pdf/`

### Adding a New Paper
1. Upload PDF to `assets/pdf/`
2. Add entry to `_pages/research.md`
3. Format: `"<a href="...">Title</a>" with [Co-author](url), *status* [[link]]`

## Design Preferences

- **Keep it minimal**: No news, no blog, no CV page (PDF is sufficient)
- **Light mode only**: Dark mode toggle disabled
- **Clean navigation**: Home, Research only
- **Academic aesthetic**: Professional, content-focused

## Deployment

GitHub Pages auto-deploys on push to `master` branch via GitHub Actions.

**Important**: `_site/` folder is gitignored. Never commit compiled files.

### Deployment Workflow

- Workflow file: `.github/workflows/deploy.yml`
- Script: `bin/deploy`
- Trigger: Push to `master` or `main`
- Deploys to `gh-pages` branch (GitHub Pages source)

### Git Authentication

GitHub CLI (`gh`) is authenticated on this system. For push/pull operations, the credential helper is configured to use `gh auth git-credential`, so no manual password entry is required.

If authentication issues occur, run:
```bash
gh auth setup-git
```

### SEO Configuration

Site has Open Graph and Schema.org meta tags enabled:
```yaml
serve_og_meta: true
serve_schema_org: true
enable_google_verification: true
```

Google Search Console verification file: `googlebde15f595e4e7bbb.html`

## Common Tasks

### Update paper status
Edit `_pages/research.md`, change the italicized status text.

### Update profile photo
Replace `assets/img/home.jpg` (recommended: ~400px width, rectangular).

### Update CV

**Source file**: `assets/pdf/cv.html` (HTML with inline CSS)
**Output**: `assets/pdf/cv.pdf`
**Generation script**: `scripts/generate-cv.js`

**To update CV:**
1. Edit `assets/pdf/cv.html`
2. Run `npm run generate-cv` to generate the PDF
3. Use cache-busting on CV link: `{{ site.url }}/assets/pdf/cv.pdf?v=2`

**PDF Generation (Playwright):**
```bash
npm run generate-cv
```

**CV Layout Preferences:**
- Page margins: 15mm on all sides (20mm bottom for page numbers)
- Page numbers: Centered at bottom of each page
- Sections: Keep together on one page (`break-inside: avoid`)
- No header in PDF output

**Chinese Font Requirements:**
System must have Chinese fonts installed:
- `fonts-noto-cjk`
- `fonts-wqy-zenhei`
- `fonts-wqy-microhei`

Font stack in HTML:
```css
font-family: Georgia, "Noto Sans CJK SC", "WenQuanYi Zen Hei", "WenQuanYi Micro Hei", serif;
```

### Change theme color
Edit `_sass/_themes.scss` --global-theme-color variable.

### Add co-author link
Edit `_data/coauthors.yml` with name and URL.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Changes not showing | Wait 1-2 min for GitHub Pages rebuild, then hard refresh (Ctrl+Shift+R) |
| Site not building | Check `_config.yml` for YAML syntax errors |
| Dark mode still shows | Ensure `_site/` not in git, push fresh |
| PDF not updating in browser | Add cache-busting query param: `?v=2` |
| GitHub Actions failing | Check `bin/deploy` has CI detection (`if [[ -z "$CI" ]]`) |
| Chinese characters not rendering in PDF | Install `fonts-noto-cjk`, `fonts-wqy-zenhei`, `fonts-wqy-microhei` |

## Lessons Learned

### GitHub Actions CI/CD
- Deprecated `::set-output` syntax → use `$GITHUB_OUTPUT` environment file
- CI environment needs special handling in deploy scripts (detached HEAD state)
- Always set `fetch-depth: 0` for checkout action when deploying
- Use `CI: true` environment variable to skip interactive prompts

### Cache Busting
Browsers cache static assets aggressively. Force refresh with version query:
```html
<a href="{{ site.url }}/assets/pdf/cv.pdf?v=2">CV</a>
```
Increment `?v=` number when updating the file.

### Font Rendering
For bilingual CVs (English + Chinese):
- HTML/CSS must specify Chinese font fallbacks
- PDF generation system needs fonts installed at OS level
- Playwright/Chromium uses system fonts for PDF rendering

## Contact

Site owner: Ruichi Xiong <ruichixiong@gmail.com>
