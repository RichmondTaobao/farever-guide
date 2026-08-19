import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const files = ['index.html','pages/beginner-guide.html','pages/classes.html','pages/weapons.html','pages/builds.html','pages/dungeons.html'];
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

async function translateBatch(batch, locale) {
  const markers = batch.map((_,i) => `ZXQFV${String(i).padStart(3,'0')}ZXQ`);
  const input = batch.map((text,i) => `${markers[i]} ${text}`).join('\n');
  const body = new URLSearchParams({client:'gtx',sl:'en',tl:locale,dt:'t',q:input});
  const response = await fetch('https://translate.googleapis.com/translate_a/single',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded;charset=UTF-8'},body});
  if (!response.ok) throw new Error(`${locale}: HTTP ${response.status}`);
  const data = await response.json();
  const translated = data[0].map(part => part[0]).join('');
  const result = [];
  for (let i=0;i<batch.length;i++) {
    const start = translated.indexOf(markers[i]);
    const end = i+1<batch.length ? translated.indexOf(markers[i+1]) : translated.length;
    if (start<0 || end<0) throw new Error(`${locale}: marker ${i} missing`);
    result.push(translated.slice(start+markers[i].length,end).trim());
  }
  return result;
}

for (const locale of locales) {
  const translated = [];
  for (let i=0;i<source.length;i+=20) translated.push(...await translateBatch(source.slice(i,i+20),locale));
  output[locale] = Object.fromEntries(source.map((text,i) => [text,translated[i]]));
  process.stdout.write(`${locale}: ${translated.length}\n`);
}

await fs.writeFile(path.join(root,'locale-content.js'),`window.FAREVER_TEXT=${JSON.stringify(output,null,2)};\n`);
