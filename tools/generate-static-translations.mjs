import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const files = ['index.html','pages/beginner-guide.html','pages/classes.html','pages/weapons.html','pages/builds.html','pages/dungeons.html','about.html','contact.html','privacy.html','terms.html','disclaimer.html'];
const locales = ['fr','de','ja','zh-CN','es','pt-BR','ko'];
const ignored = new Set(['☀️','→','↗','⚔','✦','◆','01','02','03','04','05','English','Français','Deutsch','日本語','简体中文','Español','Português','한국어']);

const decode = text => text.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>');
const strings = new Set();
for (const file of files) {
  const html = await fs.readFile(path.join(root,file),'utf8');
  for (const match of html.matchAll(/>([^<>]+)</g)) {
    const value = decode(match[1]).replace(/\s+/g,' ').trim();
    if (value && !ignored.has(value) && /[A-Za-z]/.test(value) && !value.startsWith('http')) strings.add(value);
  }
}
const source = [...strings];
const output = {en:Object.fromEntries(source.map(text => [text,text]))};
global.window = {};
try {
  await import(`${path.join(root,'locale-content.js')}?cache=${Date.now()}`);
} catch {}
const previous = global.window.FAREVER_TEXT || {};
const pause = ms => new Promise(resolve => setTimeout(resolve,ms));

async function translateOne(text, locale) {
  if (previous[locale]?.[text]) return previous[locale][text];
  for (let attempt=0;attempt<6;attempt++) {
    const body = new URLSearchParams({client:'gtx',sl:'en',tl:locale,dt:'t',q:text});
    const response = await fetch('https://translate.googleapis.com/translate_a/single',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded;charset=UTF-8'},body});
    if (response.ok) {
      const data = await response.json();
      await pause(250);
      return data[0].map(part => part[0]).join('').trim();
    }
    if (response.status !== 429) throw new Error(`${locale}: HTTP ${response.status}`);
    await pause(2000 * (attempt + 1));
  }
  throw new Error(`${locale}: translation service remained rate limited`);
}

for (const locale of locales) {
  const translated = [];
  for (const text of source) translated.push(await translateOne(text,locale));
  output[locale] = Object.fromEntries(source.map((text,i) => [text,translated[i]]));
  process.stdout.write(`${locale}: ${translated.length}\n`);
}

await fs.writeFile(path.join(root,'locale-content.js'),`window.FAREVER_TEXT=${JSON.stringify(output,null,2)};\n`);
