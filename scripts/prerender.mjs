// Inject server-rendered markup into dist/index.html so search engines and
// link previews (WhatsApp, LinkedIn, X) see real content, not an empty <div>.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const distHtml = path.join(root, 'dist', 'index.html');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render } = await import(pathToFileURL(ssrEntry).href);
const appHtml = await render();

const template = fs.readFileSync(distHtml, 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error('Root marker not found in dist/index.html');

fs.writeFileSync(distHtml, template.replace(marker, `<div id="root">${appHtml}</div>`));
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Prerendered ${(appHtml.length / 1024).toFixed(1)} kB of HTML into dist/index.html`);
