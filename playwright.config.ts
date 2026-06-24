import { defineConfig, devices } from '@playwright/test';
import { testoptions } from './test-options';

declare const process: { env: { CI?: string } };

export default defineConfig<testoptions>({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200/pages/iot-dashboard',
    globalsQAURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    trace: 'on-first-retry',
    video: {
      mode: 'on',
      size: { width: 1920, height: 1080 }
    }
  },

  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/pages/iot-dashboard'
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/',
    reuseExistingServer: true
  }
});