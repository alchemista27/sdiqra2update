const fs = require('fs');

let css = fs.readFileSync('frontend/src/app/(public)/public.css', 'utf8');

// Remove all instances of .page-header { ... } and .page-header h1 { ... }
css = css.replace(/\.page-header\s*\{[\s\S]*?\}/g, '');
css = css.replace(/\.page-header h1\s*\{[\s\S]*?\}/g, '');
css = css.replace(/\.page-header p\s*\{[\s\S]*?\}/g, '');

// Prepend a unified .page-header and .hero
const unifiedHeader = `
/* UNIFIED HERO AND PAGE-HEADER */
.hero, .page-header {
  position: relative;
  background-size: cover;
  background-position: center;
  color: var(--color-surface);
  text-align: center;
  padding: 120px 20px 160px;
}
.hero {
  background-image: url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920');
}
.page-header {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920');
}
.hero h1, .page-header h1 {
  font-size: 3rem;
  color: var(--color-surface);
  margin-bottom: var(--spacing-sm);
}
.hero p, .page-header p {
  font-size: 1.25rem;
  color: var(--color-neutral);
  margin-bottom: var(--spacing-lg);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
`;

fs.writeFileSync('frontend/src/app/(public)/public.css', unifiedHeader + css);
console.log('Fixed page-header CSS');
