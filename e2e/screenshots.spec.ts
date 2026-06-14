import { test, type Page } from '@playwright/test';
import fs from 'node:fs';

const OUT = 'tmp/shots';
fs.mkdirSync(OUT, { recursive: true });

const routes = [
  { name: 'home', path: '/' },
  { name: 'blog-vibe-coding', path: '/blog/scalable-react-applications' },
  { name: 'imprint', path: '/imprint' },
] as const;

async function settle(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  // Let the glass sheen animation reach a steady frame before capturing.
  await page.waitForTimeout(600);
}

for (const route of routes) {
  test(`page: ${route.name}`, async ({ page }, testInfo) => {
    await page.goto(route.path);
    await settle(page);
    await page.screenshot({
      path: `${OUT}/${route.name}-${testInfo.project.name}.png`,
      fullPage: true,
    });
  });
}

test('hero glass detail', async ({ page }, testInfo) => {
  await page.goto('/');
  await settle(page);
  await page
    .locator('#voice')
    .screenshot({ path: `${OUT}/hero-${testInfo.project.name}.png` });
});
