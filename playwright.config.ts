import { defineConfig, devices } from '@playwright/test'

// Ports apart from Vite's defaults (5173 and 4173), so the tests don't collide with
// a server you already run; --strictPort makes Vite fail instead of moving elsewhere.
const DEV_PORT = 5273
const PREVIEW_PORT = 4273

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  projects: [
    {
      name: 'development',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: `http://localhost:${DEV_PORT}`,
      },
    },
    {
      name: 'production',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: `http://localhost:${PREVIEW_PORT}`,
      },
    },
  ],
  webServer: [
    {
      command: `npm run dev -- --port ${DEV_PORT} --strictPort`,
      url: `http://localhost:${DEV_PORT}`,
    },
    {
      command: `npm run build && npm run preview -- --port ${PREVIEW_PORT} --strictPort`,
      url: `http://localhost:${PREVIEW_PORT}`,
      timeout: 120_000,
    },
  ],
})
