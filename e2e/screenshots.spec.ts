import { test, type Page } from '@playwright/test';
import fs from 'node:fs';

const OUT = 'tmp/shots';
fs.mkdirSync(OUT, { recursive: true });

// Full-page rasterization is expensive with backdrop filters + blurred blobs,
// especially on the 2x mobile project.
test.setTimeout(90_000);

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
      animations: 'disabled',
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

test('cv timeline expanded', async ({ page }, testInfo) => {
  await page.goto('/');
  await settle(page);
  await page.getByRole('button', { name: /full CV|Vollständigen CV/i }).click();
  // The timeline reveals entries via an intersection sensor — walk every
  // element into view so they're all visible before capturing.
  const entries = page.locator('.vertical-timeline-element');
  const count = await entries.count();
  for (let i = 0; i < count; i++) {
    await entries.nth(i).scrollIntoViewIfNeeded();
    await page.waitForTimeout(120);
  }
  // Hide the fixed nav so it doesn't float mid-capture.
  await page.addStyleTag({ content: 'nav { display: none !important; }' });
  await page.locator('#cv').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.locator('#cv').screenshot({
    path: `${OUT}/cv-timeline-${testInfo.project.name}.png`,
    animations: 'disabled',
  });
});
