(() => {
  const originalTitle = document.title;
  const translations = {
    en: {
      'nav.beginner':'Beginner Guide','nav.classes':'Classes','nav.weapons':'Weapons','nav.builds':'Builds','nav.dungeons':'Dungeons',
      'hero.eyebrow':'Early Access field guide','hero.title':'Forge your path','hero.subtitle':'through Siagarta.','hero.lead':"Clear answers for Farever's classes, weapons, builds and dungeons—built for adventurers who would rather explore than search.",'hero.start':'Play Farever','hero.watch':'Watch gameplay',
      'guides.overline':'Choose your objective','guides.title':"The adventurer's field notes",'guides.intro':'Start with the problem in front of you, then follow the trail to your next upgrade or dungeon clear.',
      'videos.overline':'Community watchlist','videos.title':'See Farever in motion','videos.intro':'Relevant, high-engagement picks led by the official trailer, practical beginner help and real gameplay.'
    },
    fr: {
      'nav.beginner':'Guide du débutant','nav.classes':'Classes','nav.weapons':'Armes','nav.builds':'Builds','nav.dungeons':'Donjons',
      'hero.eyebrow':"Guide de l'accès anticipé",'hero.title':'Forgez votre voie','hero.subtitle':'à travers Siagarta.','hero.lead':'Des réponses claires sur les classes, armes, builds et donjons de Farever, pour explorer sans perdre de temps à chercher.','hero.start':'Jouer à Farever','hero.watch':'Voir le gameplay',
      'guides.overline':'Choisissez votre objectif','guides.title':"Carnet de l'aventurier",'guides.intro':'Partez de votre objectif actuel, puis suivez la piste vers votre prochaine amélioration ou victoire en donjon.',
      'videos.overline':'Sélection communautaire','videos.title':'Découvrez Farever en action','videos.intro':'Une sélection pertinente autour de la bande-annonce officielle, de conseils pratiques et de gameplay réel.'
    },
    de: {
      'nav.beginner':'Einsteigerguide','nav.classes':'Klassen','nav.weapons':'Waffen','nav.builds':'Builds','nav.dungeons':'Dungeons',
      'hero.eyebrow':'Early-Access-Feldführer','hero.title':'Schmiede deinen Weg','hero.subtitle':'durch Siagarta.','hero.lead':'Klare Antworten zu Klassen, Waffen, Builds und Dungeons – für Abenteurer, die lieber erkunden als suchen.','hero.start':'Farever spielen','hero.watch':'Gameplay ansehen',
      'guides.overline':'Wähle dein Ziel','guides.title':'Notizen für Abenteurer','guides.intro':'Beginne mit deinem aktuellen Ziel und folge dem Weg zum nächsten Upgrade oder Dungeon-Erfolg.',
      'videos.overline':'Community-Auswahl','videos.title':'Farever in Bewegung','videos.intro':'Relevante Videos mit offiziellem Trailer, praktischen Einsteigertipps und echtem Gameplay.'
    },
    ja: {
      'nav.beginner':'初心者ガイド','nav.classes':'クラス','nav.weapons':'武器','nav.builds':'ビルド','nav.dungeons':'ダンジョン',
      'hero.eyebrow':'早期アクセス攻略ガイド','hero.title':'自分だけの道を拓こう','hero.subtitle':'シアガルタの世界で。','hero.lead':'Fareverのクラス、武器、ビルド、ダンジョンを分かりやすく解説。検索より冒険を楽しみたいプレイヤーへ。','hero.start':'Fareverをプレイ','hero.watch':'ゲームプレイを見る',
      'guides.overline':'目的を選ぶ','guides.title':'冒険者のフィールドノート','guides.intro':'今の悩みから始め、次の強化やダンジョン攻略へ進みましょう。',
      'videos.overline':'コミュニティ動画','videos.title':'動くFareverをチェック','videos.intro':'公式トレーラー、実用的な初心者ガイド、実際のゲームプレイを厳選。'
    },
    'zh-CN': {
      'nav.beginner':'新手指南','nav.classes':'职业','nav.weapons':'武器','nav.builds':'构筑','nav.dungeons':'地下城',
      'hero.eyebrow':'抢先体验冒险指南','hero.title':'锻造属于你的道路','hero.subtitle':'探索希亚加塔。','hero.lead':'清晰解答 Farever 的职业、武器、构筑和地下城问题，把时间留给探索，而不是反复搜索。','hero.start':'前往游玩 Farever','hero.watch':'观看实机',
      'guides.overline':'选择你的目标','guides.title':'冒险者野外手册','guides.intro':'从眼前的问题开始，沿着线索完成下一次升级或地下城挑战。',
      'videos.overline':'社区精选视频','videos.title':'观看 Farever 实机内容','videos.intro':'精选官方预告、实用新手教学和真实游戏演示。'
    },
    es: {
      'nav.beginner':'Guía para principiantes','nav.classes':'Clases','nav.weapons':'Armas','nav.builds':'Builds','nav.dungeons':'Mazmorras',
      'hero.eyebrow':'Guía de acceso anticipado','hero.title':'Forja tu camino','hero.subtitle':'por Siagarta.','hero.lead':'Respuestas claras sobre clases, armas, builds y mazmorras de Farever para quienes prefieren explorar antes que buscar.','hero.start':'Jugar a Farever','hero.watch':'Ver gameplay',
      'guides.overline':'Elige tu objetivo','guides.title':'Notas del aventurero','guides.intro':'Empieza con tu objetivo actual y sigue el camino hacia tu próxima mejora o victoria en una mazmorra.',
      'videos.overline':'Selección de la comunidad','videos.title':'Mira Farever en acción','videos.intro':'Tráiler oficial, consejos útiles para principiantes y gameplay real seleccionados por relevancia.'
    },
    'pt-BR': {
      'nav.beginner':'Guia para iniciantes','nav.classes':'Classes','nav.weapons':'Armas','nav.builds':'Builds','nav.dungeons':'Masmorras',
      'hero.eyebrow':'Guia do Acesso Antecipado','hero.title':'Forje seu caminho','hero.subtitle':'por Siagarta.','hero.lead':'Respostas claras sobre classes, armas, builds e masmorras de Farever para quem prefere explorar em vez de pesquisar.','hero.start':'Jogar Farever','hero.watch':'Ver gameplay',
      'guides.overline':'Escolha seu objetivo','guides.title':'Notas do aventureiro','guides.intro':'Comece pelo desafio atual e siga a trilha até o próximo upgrade ou vitória em uma masmorra.',
      'videos.overline':'Seleção da comunidade','videos.title':'Veja Farever em ação','videos.intro':'Trailer oficial, dicas práticas para iniciantes e gameplay real selecionados por relevância.'
    },
    ko: {
      'nav.beginner':'초보자 가이드','nav.classes':'클래스','nav.weapons':'무기','nav.builds':'빌드','nav.dungeons':'던전',
      'hero.eyebrow':'얼리 액세스 모험 가이드','hero.title':'나만의 길을 개척하세요','hero.subtitle':'시아가르타를 누비며.','hero.lead':'Farever의 클래스, 무기, 빌드, 던전을 명확하게 안내합니다. 검색보다 모험에 더 많은 시간을 쓰세요.','hero.start':'Farever 플레이','hero.watch':'게임플레이 보기',
      'guides.overline':'목표 선택','guides.title':'모험가의 필드 노트','guides.intro':'현재 목표에서 시작해 다음 강화나 던전 클리어까지 길을 따라가세요.',
      'videos.overline':'커뮤니티 추천','videos.title':'Farever 게임플레이 보기','videos.intro':'공식 트레일러, 실용적인 초보자 팁, 실제 게임플레이를 엄선했습니다.'
    }
  };

  const normalize = value => translations[value] ? value : (value?.toLowerCase().startsWith('zh') ? 'zh-CN' : value?.split('-')[0]);
  const originalText = new WeakMap();
  const translateWholePage = language => {
    const table = window.FAREVER_TEXT?.[language] || window.FAREVER_TEXT?.en || {};
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest('script,style')) continue;
      if (!originalText.has(node)) originalText.set(node,node.nodeValue);
      const original = originalText.get(node);
      const source = original.replace(/\s+/g,' ').trim();
      const translated = table[source] || window.FAREVER_TEXT?.en?.[source];
      if (translated) node.nodeValue = original.replace(source,translated);
      else node.nodeValue = original;
    }
  };
  const applyLanguage = requested => {
    const language = normalize(requested) || 'en';
    const dictionary = translations[language] || translations.en;
    document.documentElement.lang = language;
    translateWholePage(language);
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const value = dictionary[node.dataset.i18n] || translations.en[node.dataset.i18n];
      if (value) node.textContent = value;
    });
    document.querySelectorAll('[data-language]').forEach(select => { select.value = language; });
    document.title = window.FAREVER_TEXT?.[language]?.[originalTitle] || originalTitle;
    localStorage.setItem('farever-language', language);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('farever-language');
    applyLanguage(saved || normalize(navigator.language) || 'en');
    document.querySelectorAll('[data-language]').forEach(select => select.addEventListener('change', event => applyLanguage(event.target.value)));
  });
})();
