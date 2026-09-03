const fs = require('fs');
const path = require('path');

const publicDir = 'frontend/src/app/(public)';
let combinedCSS = '';

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (file === 'page.tsx') {
            let content = fs.readFileSync(fullPath, 'utf8');
            const styleMatch = content.match(/<style>\{`([\s\S]*?)`\}<\/style>/);
            if (styleMatch) {
                combinedCSS += `\n/* From ${fullPath} */\n${styleMatch[1]}\n`;
                // Remove the <style> block from the file
                content = content.replace(/<style>\{`[\s\S]*?`\}<\/style>/, '');
                fs.writeFileSync(fullPath, content);
                console.log(`Cleaned ${fullPath}`);
            }
        }
    }
}

processDir(publicDir);
fs.writeFileSync('frontend/src/app/(public)/public.css', combinedCSS);
console.log('Done!');
