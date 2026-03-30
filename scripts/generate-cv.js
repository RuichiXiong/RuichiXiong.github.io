const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const cvPath = path.join(__dirname, '..', 'assets', 'pdf', 'cv.html');
  const outputPath = path.join(__dirname, '..', 'assets', 'pdf', 'cv.pdf');

  await page.goto('file://' + cvPath, { waitUntil: 'networkidle' });

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '15mm', bottom: '20mm', left: '15mm' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="font-size: 11px; color: #666; width: 100%; text-align: center; padding-bottom: 5mm; font-family: Georgia, 'Noto Sans CJK SC', serif;">
        <span class="pageNumber"></span>
      </div>
    `
  });

  await browser.close();
  console.log('PDF generated successfully: assets/pdf/cv.pdf');
})();
