import { expect, test } from "@playwright/test";

test.describe("contingut del perfil", () => {
  test("la foto surt a la secció de perfil i carrega bé", async ({ page }) => {
    await page.goto("/#sobre-mi");
    const foto = page.getByRole("img", { name: /celestí ticó petit/i });
    await expect(foto).toBeVisible();

    // naturalWidth > 0 vol dir que el navegador l'ha descarregada de debò,
    // no només que l'etiqueta <img> hi és.
    await expect
      .poll(() => foto.evaluate((el: HTMLImageElement) => el.naturalWidth))
      .toBeGreaterThan(0);
  });

  test("el grup d'eines de flux de treball hi és, amb Claude Code i PhpStorm", async ({ page }) => {
    await page.goto("/#skills");
    const seccio = page.locator("#skills");
    await expect(seccio.getByText(/flux de treball/i)).toBeVisible();
    await expect(seccio.getByText(/claude code/i)).toBeVisible();
    await expect(seccio.getByText(/phpstorm/i)).toBeVisible();
  });

  test("les xifres clau del perfil es mantenen", async ({ page }) => {
    await page.goto("/");
    for (const xifra of ["422", "200+", "100%"]) {
      await expect(page.getByText(xifra, { exact: true }).first()).toBeVisible();
    }
  });
});

test.describe("idioma i tema", () => {
  test("canviar d'idioma tradueix el contingut i es recorda en recarregar", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /amb què treballo/i })).toBeVisible();

    await page.getByRole("button", { name: "EN", exact: true }).click();
    await expect(page.getByRole("heading", { name: /what i work with/i })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await page.reload();
    await expect(page.getByRole("heading", { name: /what i work with/i })).toBeVisible();
  });

  test("el commutador de tema canvia entre clar i fosc", async ({ page }) => {
    await page.goto("/");
    const fons = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const abans = await fons();

    await page.getByRole("button", { name: /tema (nit|dia)/i }).click();
    await expect.poll(fons).not.toBe(abans);
  });
});

test.describe("auditoria Lighthouse", () => {
  test("hi ha els quatre mesuradors amb un 100 cadascun", async ({ page }) => {
    await page.goto("/#calidad");
    const seccio = page.locator("#calidad");
    await expect(seccio.getByText("100", { exact: true })).toHaveCount(4);
    // el subtítol de la secció també anomena les quatre mètriques, així que
    // busquem les etiquetes dels mesuradors, que van en majúscules i soles.
    for (const etiqueta of ["Rendiment", "Accessibilitat", "Bones pràctiques", "SEO"]) {
      await expect(seccio.getByText(etiqueta, { exact: true })).toBeVisible();
    }
  });

  test("els anells es dibuixen en entrar a la vista, no en carregar", async ({ page }) => {
    await page.goto("/");
    const anell = page.locator("#calidad circle[stroke-linecap='round']").first();

    // encara no s'hi ha arribat: l'anell ha d'estar sense traçar
    const inicial = await anell.evaluate((el) => el.getAttribute("stroke-dashoffset"));
    expect(Number(inicial)).toBeGreaterThan(0);

    await page.locator("#calidad").scrollIntoViewIfNeeded();
    await expect
      .poll(() => anell.evaluate((el) => Number(el.getAttribute("stroke-dashoffset"))), { timeout: 5000 })
      .toBeLessThan(1);
  });
});
