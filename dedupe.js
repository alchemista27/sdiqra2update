const fs = require('fs');
let css = fs.readFileSync('frontend/src/app/(public)/public.css', 'utf8');

// We will just remove any :root { ... } and * { ... } blocks entirely,
// because globals.css already handles standard variables and resets.
css = css.replace(/:root\s*\{[\s\S]*?\}/g, '');
css = css.replace(/\*\s*\{[\s\S]*?\}/g, '');
css = css.replace(/body\s*\{[\s\S]*?\}/g, '');
css = css.replace(/h1,\s*h2,\s*h3\s*\{[\s\S]*?\}/g, '');

fs.writeFileSync('frontend/src/app/(public)/public.css', css);
console.log('Deduped public.css');
