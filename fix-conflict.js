const fs = require('fs');
let css = fs.readFileSync('frontend/src/app/(public)/public.css', 'utf8');

// Strip all important paddings and margins for .about
css = css.replace(/padding-top: 80px !important;/g, '');
css = css.replace(/padding-bottom: 80px !important;/g, '');
css = css.replace(/margin-bottom: 60px;/g, '');
css = css.replace(/margin-bottom: 80px;/g, '');
css = css.replace(/padding: 80px var\(--spacing-lg\);/g, '');
css = css.replace(/padding: 60px var\(--spacing-lg\);/g, '');

// Strip mobile important override for flex layouts
css = css.replace(/padding: 40px 16px !important;/g, '');

// Restore the hero highlight overlap
css = css.replace('.highlight-boxes, .grid-cards {\n    margin-top: -40px !important;', '.highlight-boxes, .grid-cards {\n    /* margin-top handled by tailwind on page.tsx */');

fs.writeFileSync('frontend/src/app/(public)/public.css', css);
