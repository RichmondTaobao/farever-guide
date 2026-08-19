import fs from 'node:fs';
global.window={};
await import('../locale-content.js');
const t=window.FAREVER_TEXT;
Object.assign(t.fr,{'Weapons':'Armes','CO-OP':'COOPÉRATIF','Community watchlist':'Sélection communautaire','Early Access Launch Trailer':'Bande-annonce de lancement en accès anticipé','Farever Classes':'Classes de Farever','Objectives':'Objectifs','Rewards':'Récompenses'});
Object.assign(t.es,{'Classes':'Clases','Builds':'Configuraciones','Priority order':'Orden de prioridad','Alternatives':'Alternativas','Preparation':'Preparación','Rewards':'Recompensas'});
Object.assign(t['pt-BR'],{'Language':'Idioma','ACTION':'AÇÃO','Community watchlist':'Seleção da comunidade','Early Access Launch Trailer':'Trailer de lançamento do Acesso Antecipado',"Beginner's Guide":'Guia para iniciantes','Gameplay':'Jogabilidade','Patch-aware advice':'Orientação atualizada por versão','Research checklist':'Lista de verificação de pesquisa','Farever Classes':'Classes de Farever','Comparison format':'Formato de comparação','Farever Weapons':'Armas de Farever','Content rule':'Regra de conteúdo','Build template':'Modelo de construção','Priority order':'Ordem de prioridade','Alternatives':'Alternativas','Rewards':'Recompensas'});
fs.writeFileSync(new URL('../locale-content.js',import.meta.url),`window.FAREVER_TEXT=${JSON.stringify(t,null,2)};\n`);
