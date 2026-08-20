const { test, expect } = require('@playwright/test');

const pages = ['/', '/pages/beginner-guide.html', '/pages/classes.html', '/pages/weapons.html', '/pages/builds.html', '/pages/dungeons.html', '/about.html', '/contact.html', '/privacy.html', '/terms.html', '/disclaimer.html'];
const locales = ['fr','de','ja','zh-CN','es','pt-BR','ko'];
const englishLeaks = [
  'Early Access field guide', 'Choose your objective', 'Community watchlist', 'An evolving world',
  'Local prototype note:', 'This page is structurally complete', 'Related guides',
  'Start with these questions', 'What this page should answer', 'What players need',
  'Build template', 'Dungeon page structure', 'Independent guide prototype',
  'About Farever Guide', 'Privacy & Cookie Policy', 'Terms of Use', 'Editorial & Media Disclaimer'
];

for (const pathname of pages) {
  for (const locale of locales) {
    test(`${pathname} fully switches to ${locale}`, async ({ page }) => {
      await page.goto(`http://127.0.0.1:8080${pathname}`);
      await page.locator('[data-language]').selectOption(locale);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      const text = await page.locator('body').innerText();
      for (const phrase of englishLeaks) expect(text).not.toContain(phrase);
    });
  }
}
