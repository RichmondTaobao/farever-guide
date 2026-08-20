const { test, expect } = require('@playwright/test');

test('analytics stays off until consent, then GA4 sends a collection request', async ({ page }) => {
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('http://127.0.0.1:8080/?playwright_ga_check=1');
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  expect(requests.some(url => url.includes('googletagmanager.com/gtag/js?id=G-4MVT8PR9EK'))).toBeFalsy();
  await page.locator('.cookie-accept').click();
  await page.waitForTimeout(3000);
  expect(requests.some(url => url.includes('googletagmanager.com/gtag/js?id=G-4MVT8PR9EK'))).toBeTruthy();
  expect(requests.some(url => url.includes('google-analytics.com/g/collect') && url.includes('tid=G-4MVT8PR9EK'))).toBeTruthy();
});

test('declining analytics does not load GA4', async ({ page }) => {
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('http://127.0.0.1:8080/');
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.locator('.cookie-decline').click();
  await page.waitForTimeout(1000);
  expect(requests.some(url => url.includes('googletagmanager.com/gtag/js') || url.includes('google-analytics.com/g/collect'))).toBeFalsy();
});
