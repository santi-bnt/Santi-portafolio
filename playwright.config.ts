import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: { baseURL: "http://localhost:3099", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], channel: process.env.PLAYWRIGHT_CHANNEL || "msedge" } }],
  webServer: {
    command: "npm run start -- --port 3099 --hostname 127.0.0.1",
    url: "http://localhost:3099",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
