const fs = require('fs');
let css = fs.readFileSync('frontend/src/app/(public)/public.css', 'utf8');

// Fix 1: highlight-boxes margin bottom
css = css.replace('.highlight-boxes {', '.highlight-boxes {\n          margin-bottom: 80px;');

// Fix 2: about section gap/margin
css = css.replace('.about {', '.about {\n          margin-bottom: 60px;');

// Fix 3: programs section margin
css = css.replace('.programs {', '.programs {\n          margin-bottom: 60px;');

// Fix 4: Container overriding issue. Let's make sure .about gets its padding back.
css = css.replace('.about {', '.about {\n          padding-top: 80px !important;\n          padding-bottom: 80px !important;');
css = css.replace('.programs {', '.programs {\n          padding-top: 80px !important;\n          padding-bottom: 80px !important;');

fs.writeFileSync('frontend/src/app/(public)/public.css', css);
console.log('Fixed homepage spacing CSS');
