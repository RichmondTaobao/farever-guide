(() => {
  const STORAGE_KEY = 'farever-cookie-consent';
  const GA_ID = 'G-4MVT8PR9EK';
  const assetRoot = document.currentScript?.src.replace(/consent\.js(?:\?.*)?$/,'') || '';
  let analyticsLoaded = false;

  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }

  function removeBanner() { document.querySelector('.cookie-banner')?.remove(); }

  function saveChoice(choice) {
    localStorage.setItem(STORAGE_KEY, choice);
    removeBanner();
    if (choice === 'accepted') loadAnalytics();
  }

  function showBanner() {
    removeBanner();
    const banner = document.createElement('section');
    banner.className = 'cookie-banner';
    banner.setAttribute('role','dialog');
    banner.setAttribute('aria-label','Cookie and analytics preferences');
    banner.innerHTML = `<div><strong>Cookie & analytics choices</strong><p>We use optional Google Analytics cookies to understand visits and improve this independent guide. You can accept or decline analytics. See our <a href="${assetRoot}privacy.html">Privacy Policy</a>.</p></div><div class="cookie-actions"><button type="button" class="cookie-decline">Decline</button><button type="button" class="cookie-accept">Accept analytics</button></div>`;
    banner.querySelector('.cookie-accept').addEventListener('click',() => saveChoice('accepted'));
    banner.querySelector('.cookie-decline').addEventListener('click',() => saveChoice('declined'));
    document.body.appendChild(banner);
  }

  document.addEventListener('DOMContentLoaded',() => {
    const choice = localStorage.getItem(STORAGE_KEY);
    if (choice === 'accepted') loadAnalytics();
    else if (choice !== 'declined') showBanner();
    document.querySelectorAll('[data-cookie-settings]').forEach(button => button.addEventListener('click',showBanner));
  });
})();
