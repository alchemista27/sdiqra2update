const fs = require('fs');
let css = fs.readFileSync('frontend/src/app/(public)/public.css', 'utf8');

// Replace all margin: 0 auto; with margin-inline: auto; to preserve vertical margins!
css = css.replace(/margin:\s*0\s+auto;/g, 'margin-left: auto; margin-right: auto;');

// Also, the previous script might have added margin-bottom correctly, let's verify.
fs.writeFileSync('frontend/src/app/(public)/public.css', css);
console.log('Fixed container margins');
