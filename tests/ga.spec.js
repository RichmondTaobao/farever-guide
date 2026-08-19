const { test, expect } = require('@playwright/test');

test('live site loads GA4 and sends a collection request', async ({ page }) => {
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('https://richmondtaobao.github.io/farever-guide/?playwright_ga_check=1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  expect(requests.some(url => url.includes('googletagmanager.com/gtag/js?id=G-4MVT8PR9EK'))).toBeTruthy();
  expect(requests.some(url => url.includes('google-analytics.com/g/collect') && url.includes('tid=G-4MVT8PR9EK'))).toBeTruthy();
});
