import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexPath = path.join(distDir, 'index.html');
const assetsDir = path.join(distDir, 'assets');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf-8');

// Find CSS file
const files = fs.readdirSync(assetsDir);
const cssFile = files.find((f) => f.endsWith('.css'));
const jsFile = files.find((f) => f.endsWith('.js'));

if (cssFile) {
  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8');
  // Replace <link rel="stylesheet" ... href="/assets/..."> with inline <style>
  html = html.replace(
    new RegExp(`<link rel="stylesheet"[^>]*href="[^"]*${cssFile}"[^>]*>`, 'g'),
    `<style>\n${cssContent}\n</style>`
  );
}

if (jsFile) {
  let jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf-8');
  // Replace <script type="module" ... src="/assets/..."> with inline <script type="module">
  html = html.replace(
    new RegExp(`<script type="module"[^>]*src="[^"]*${jsFile}"[^>]*></script>`, 'g'),
    `<script type="module">\n${jsContent}\n</script>`
  );
}

// Write standalone index.html
const standalonePath = path.join(distDir, 'index-standalone.html');
fs.writeFileSync(standalonePath, html, 'utf-8');

// Also save directly to root as public/index-standalone.html so it can be served or downloaded statically
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
fs.writeFileSync(path.join(publicDir, 'index-standalone.html'), html, 'utf-8');

console.log('✅ Standalone single-file index.html generated successfully at:');
console.log(' - ' + standalonePath);
console.log(' - ' + path.join(publicDir, 'index-standalone.html'));
