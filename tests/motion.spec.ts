import { expect, test } from "@playwright/test";

test("desktop storytelling follows scroll without losing status boundaries", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await expect(page.locator(".hero")).toHaveAttribute("data-entrance", "playing");
  const heroDelays = await page.locator(".hero h1, .hero-statement, .hero-description, .hero-actions").evaluateAll(elements => elements.map(el => Number.parseFloat(getComputedStyle(el).animationDelay)));
  expect(heroDelays).toEqual([0, 0.12, 0.21, 0.3]);
  for (const story of ["radar", "cuty"]) {
    const root = page.locator(`[data-story="${story}"]`);
    const steps = root.locator(".story-step");
    await expect(root.locator(".story-stage")).toHaveCSS("position", "sticky");
    for (let index = 0; index < await steps.count(); index++) {
      await steps.nth(index).evaluate(element => element.scrollIntoView({ block: "center", behavior: "instant" }));
      await expect(steps.nth(index)).toHaveAttribute("data-active", "true");
      await expect(root.locator(".story-node").nth(index)).toHaveAttribute("data-active", "true");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (index === 1) {
        const box = await root.locator(".story-stage").boundingBox();
        expect(box?.y).toBeCloseTo(125, 0);
        await page.screenshot({ path: `test-results/story-${story}-desktop.png` });
      }
    }
  }
  const cuty = page.locator('[data-story="cuty"]');
  await expect(cuty.locator(".story-step").nth(4).locator(".evidence-state")).toHaveText("Planned");
  await expect(cuty.locator(".story-step").nth(5).locator(".evidence-state")).toHaveText("In progress");
  await expect(page.locator("body")).toHaveAttribute("data-scrolled", "true");
  expect(await page.locator(".scroll-progress").evaluate(el => getComputedStyle(el).transform)).not.toBe("matrix(0, 0, 0, 1, 0, 0)");
  await page.getByRole("link", { name: "Visit Website", exact: true }).first().scrollIntoViewIfNeeded();
  await expect(page.getByRole("link", { name: "Visit Website", exact: true }).first()).toHaveAttribute("href", "https://cuty.mx");
  await page.locator(".project-content").nth(1).getByRole("link", { name: "Explore project" }).click();
  await expect(page).toHaveURL(/\/projects\/cuty$/);
  await expect(page.locator(".route-transition")).toHaveCSS("animation-name", "route-enter");
  await expect(page.getByRole("link", { name: "Visit Website", exact: true })).toHaveAttribute("href", "https://cuty.mx");
  expect(errors).toEqual([]);
});

test("mobile uses a readable static story and no parallax", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  for (const stage of await page.locator(".story-stage").all()) await expect(stage).toHaveCSS("position", "relative");
  await expect(page.locator(".hero-aside")).toHaveCSS("translate", "none");
  for (const step of await page.locator(".story-step").all()) {
    await step.scrollIntoViewIfNeeded();
    await expect(step).toHaveAttribute("data-visible", "true");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.locator('[data-story="cuty"] .story-stage').scrollIntoViewIfNeeded();
  await page.screenshot({ path: "test-results/story-cuty-mobile.png" });
});

test("reduced motion disables entrance animations, sticky motion, parallax and hidden reveals", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await expect(page.locator(".hero h1")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".scroll-progress")).toHaveCSS("display", "none");
  for (const stage of await page.locator(".story-stage").all()) await expect(stage).toHaveCSS("position", "relative");
  for (const visual of await page.locator(".project-visual").all()) await expect(visual).toHaveCSS("translate", "none");
  for (const element of await page.locator("[data-reveal]").all()) await expect(element).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
});

test("entrance enhancement causes no meaningful layout shift and content works without JavaScript", async ({ page, browser }) => {
  await page.addInitScript(() => {
    const shifts: number[] = [];
    Object.assign(window, { portfolioLayoutShifts: shifts });
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
        if (!shift.hadRecentInput) shifts.push(shift.value);
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/");
  await expect(page.locator(".startup-intro")).toHaveAttribute("data-state", "complete");
  await page.locator(".hero-actions").evaluate(element => Promise.all(element.getAnimations().map(animation => animation.finished)));
  const cls = await page.evaluate(() => ((window as Window & { portfolioLayoutShifts?: number[] }).portfolioLayoutShifts || []).reduce((sum, value) => sum + value, 0));
  expect(cls).toBeLessThan(0.05);
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("http://localhost:3099/");
  await expect(staticPage.getByRole("heading", { level: 1 })).toContainText("Santiago");
  await expect(staticPage.locator(".story-step")).toHaveCount(10);
  await expect(staticPage.locator(".project-content").first()).toHaveCSS("opacity", "1");
  await context.close();
});

test("startup intro is visible after mounting and reveals the hero on desktop and mobile", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const intro = page.locator(".startup-intro");
    await expect(intro).toHaveAttribute("data-state", "playing");
    await expect(intro).toHaveCSS("display", "flex");
    await expect(page.locator(".hero")).toHaveAttribute("data-entrance", "pending");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator(".intro-name > span:nth-child(2) > span").evaluate(element => Promise.all(element.getAnimations().map(animation => animation.finished)));
    await page.screenshot({ path: `test-results/startup-${width}.png` });
    await expect(intro).toHaveAttribute("data-state", "complete");
    await expect(intro).toHaveCSS("display", "none");
    await expect(page.locator(".hero-actions")).toHaveCSS("opacity", "1");
  }
  await page.goto("/#projects");
  await expect(page.locator(".startup-intro")).toHaveCSS("display", "none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".startup-intro")).toHaveCSS("display", "none");
  await expect(page.locator(".hero h1")).toHaveCSS("opacity", "1");
});

test("C.U.T.Y. cover shows the robot design and retains the PCB in technical details", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const card = page.locator(".featured-project").nth(1);
  const cover = card.locator(".project-media img");
  await cover.scrollIntoViewIfNeeded();
  await expect(cover).toHaveAttribute("src", /cuty-assembly/);
  await expect(card.locator(".project-media figcaption")).toContainText("repository render");
  await expect.poll(() => cover.evaluate(element => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBe(true);
  await page.screenshot({ path: "test-results/cuty-robot-cover.png" });
  await page.goto("/projects/cuty");
  await expect(page.locator(".detail-image")).toHaveCount(2);
  await expect(page.locator(".detail-image").first().locator("img")).toHaveAttribute("src", /cuty-assembly/);
  await expect(page.locator(".detail-image").last().locator("img")).toHaveAttribute("src", /cuty-carrier/);
});

test("Radar UI cover and MATT source-interface material stay attributed", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    for (const [selector, name] of [[".visual-internship-radar .project-media", "radar-interface"], ['.small-project-media:has(img[src*="matt-system-illustration"])', "matt-system-illustration"]]) {
      const preview = page.locator(selector);
      await preview.scrollIntoViewIfNeeded();
      await expect(preview.locator("img")).toHaveAttribute("src", new RegExp(name));
      await expect.poll(() => preview.locator("img").evaluate(element => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `test-results/${name}-card-${width}.png` });
    }
  }
  for (const slug of ["internship-radar", "matt"]) {
    await page.goto(`/projects/${slug}`);
    const original = page.locator(`.detail-image:has(img[src*="${slug === "matt" ? "matt-interface" : "radar-interface"}"])`);
    await expect(original).toHaveCount(1);
    await expect(original.locator("figcaption")).toContainText("preview");
    await expect(original.locator("a")).toHaveAttribute("href", /^https:\/\/github.com\/santi-bnt\//);
  }
});

test("VR reconstructions and SkiliAir hardware illustration load with explicit provenance", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [slug, asset] of [["skiliair", "skiliair-system.svg"], ["dc-motor-control", "webxr-motor-interaction.svg"], ["tic-cat-toe", "tic-cat-toe-vr.svg"]]) {
      await page.goto(`/projects/${slug}`);
      const media = page.locator(".detail-image");
      await media.scrollIntoViewIfNeeded();
      await expect(media.locator("img")).toHaveAttribute("src", new RegExp(asset));
      await expect.poll(() => media.locator("img").evaluate(element => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBe(true);
      await expect(media.locator("figcaption")).toContainText(/illustrat|reconstruct/i);
      await expect(media.locator("a")).toHaveAttribute("href", /^https:\/\/github.com\/santi-bnt\//);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `test-results/${slug}-visual-${width}.png` });
    }
  }
});

test("MATT scan effect animates and respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/images/matt-system-illustration.svg");
  const sweep = page.locator(".scan-sweep");
  await expect(sweep).toHaveCSS("animation-name", "scan-board");
  const initial = await sweep.evaluate(element => getComputedStyle(element).transform);
  await expect.poll(() => sweep.evaluate(element => getComputedStyle(element).transform)).not.toBe(initial);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(sweep).toHaveCSS("animation-name", "none");
  await expect(sweep).toBeVisible();
});

test("illustrated MATT and FPGA covers preserve their reference material", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    for (const asset of ["matt-system-illustration", "fpga-de10-lite-concept"]) {
      const cover = page.locator(`.small-project-media:has(img[src*="${asset}"])`);
      await cover.scrollIntoViewIfNeeded();
      await expect(cover.locator("img")).toHaveCSS("object-fit", "contain");
      await expect.poll(() => cover.locator("img").evaluate(element => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `test-results/${asset}-${width}.png` });
    }
  }
  for (const slug of ["matt", "fpga-digital-design"]) {
    await page.goto(`/projects/${slug}`);
    await expect(page.locator(".detail-image")).toHaveCount(2);
    await expect(page.locator(".detail-image").first().locator("figcaption")).toContainText(/illustrat|reconstruct/i);
  }
});
