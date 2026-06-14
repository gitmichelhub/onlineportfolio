import { defineConfig, devices } from '@playwright/test';

/**
 * Screenshot / visual-check setup for the portfolio.
 *
 * Run with `npm run shots` — PNGs land in `tmp/shots/`.
 *
 * Notes:
 * - Chromium only. The liquid-glass effect relies on `backdrop-filter: url(#svg)`,
 *   which is effectively Chromium-only, so WebKit/Firefox would not render the
 *   real refraction anyway (and would need extra browser downloads).
 * - `reuseExistingServer` lets this attach to a dev server you already started
 *   (e.g. `npm run dev`), and otherwise starts its own — sidestepping the
 *   hardcoded port 8080 collision.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:8080',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2,
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8080',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
