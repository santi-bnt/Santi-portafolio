import { expect, test } from "@playwright/test";
import { projects } from "../data/projects";

for (const width of [375, 768, 1440]) {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`${width}px / ${colorScheme}: responsive content, images and no browser errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
      const response = await page.goto("/");
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Santiago");
      await expect(page.getByRole("navigation")).toBeVisible();
      await expect(page.locator(".featured-project")).toHaveCount(4);
      for (const img of await page.locator("img").all()) {
        await img.scrollIntoViewIfNeeded();
        await expect.poll(() => img.evaluate(element => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBe(true);
      }
      await page.locator("#contact").scrollIntoViewIfNeeded();
      await expect(page.locator("#contact")).toBeVisible();
      await expect.poll(() => page.locator("img").evaluateAll(images => images.every(img => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0))).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const clipped = await page.locator("a, button, h1, h2, h3").evaluateAll(elements => elements.filter(element => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1) && !element.classList.contains("skip-link");
      }).map(element => element.textContent));
      expect(clipped).toEqual([]);
      expect(errors).toEqual([]);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `test-results/portfolio-${width}-${colorScheme}.png`, fullPage: true });
      await page.screenshot({ path: `test-results/viewport-${width}-${colorScheme}.png` });
    });
  }
}

test("filters show the correct area and can be reset", async ({ page }) => {
  await page.goto("/");
  const hardware = page.getByRole("button", { name: "Hardware", exact: true });
  await hardware.focus();
  await page.keyboard.press("Enter");
  await expect(hardware).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".featured-project")).toHaveCount(2);
  await expect(page.locator(".small-project")).toHaveCount(1);
  await expect(page.locator("#project-results")).not.toContainText("Internship Radar");
  await page.getByRole("button", { name: /^All/ }).click();
  await expect(page.locator(".featured-project")).toHaveCount(4);
  await expect(page.locator(".small-project")).toHaveCount(3);
});

test("manual theme persists; system mode follows device preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByLabel("Color theme").selectOption("dark");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe("dark");
  await page.reload();
  await expect(page.getByLabel("Color theme")).toHaveValue("dark");
  await page.getByLabel("Color theme").selectOption("system");
  await page.emulateMedia({ colorScheme: "light" });
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe("light");
  await page.emulateMedia({ colorScheme: "dark" });
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe("dark");
});

test("all project routes render evidence, source links and responsive architecture", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const project of projects) {
    const response = await page.goto(`/projects/${project.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(project.name);
    await expect(page.getByRole("heading", { name: "Current status", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Architecture", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "View Source", exact: true })).toHaveAttribute("href", project.githubUrl);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator("img").evaluateAll(images => images.every(img => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0))).toBe(true);
    if (project.slug === "cuty") {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `test-results/cuty-${width}-light.png`, fullPage: true });
    }
    }
  }
  expect(errors).toEqual([]);
});

test("keyboard users can skip the navigation", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content", exact: true });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
});

test("unverified contact details and CV stay hidden; unknown projects return 404", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Resume", exact: true })).toHaveCount(0);
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  const response = await page.goto("/projects/missing-project");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("This route doesn’t connect");
});
