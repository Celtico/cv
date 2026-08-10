import { expect, test } from "@playwright/test";
import { content } from "../app/content";

// Els selectors es deriven del diccionari en comptes de repetir-hi el text en
// català: així el test verifica que el contingut es renderitza de debò i
// sobreviu a les reescriptures del copy.
const ca = content.ca;

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
    await expect(seccio.getByText(ca.skills.groups[6], { exact: true })).toBeVisible();
    await expect(seccio.getByText(/claude code/i)).toBeVisible();
    await expect(seccio.getByText(/phpstorm/i)).toBeVisible();
  });

  test("les xifres clau del perfil es mantenen", async ({ page }) => {
    await page.goto("/");
    for (const xifra of ["422", "200+", "100%"]) {
      await expect(page.getByText(xifra, { exact: true }).first()).toBeVisible();
    }
  });

  test("la disponibilitat es veu també en pantalla petita", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(ca.hero.disponible, { exact: true })).toBeVisible();
  });
});

test.describe("idioma i tema", () => {
  test("canviar d'idioma porta a la seva URL i hi sobreviu la recàrrega", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: ca.skills.title })).toBeVisible();

    // el commutador ara són enllaços de debò: cada idioma té la seva URL
    await page.getByRole("link", { name: "EN", exact: true }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.getByRole("heading", { name: content.en.skills.title })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await page.reload();
    await expect(page.getByRole("heading", { name: content.en.skills.title })).toBeVisible();
  });

  test("el castellà el serveix el servidor, no el client", async ({ request }) => {
    const html = await (await request.get("/es")).text();
    expect(html).toContain("búsqueda activa");
    expect(html).toContain('hrefLang="en"');
  });

  test("el commutador de tema canvia entre clar i fosc", async ({ page }) => {
    await page.goto("/");
    // S'asserta sobre el senyal determinista (la classe de mode de Chakra) i no
    // sobre el color de fons: l'accent se sorteja a cada càrrega i el reescriu,
    // així que el test podia passar encara que el commutador estigués trencat.
    const mode = () => page.locator("body").getAttribute("class");
    const abans = await mode();
    await page.getByRole("button", { name: /tema (nit|dia)/i }).click();
    await expect.poll(mode).not.toBe(abans);
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("chakra-ui-color-mode")))
      .toMatch(/light|dark/);
  });
});

test.describe("accent dinàmic", () => {
  test("el color es pinta abans d'hidratar i el paràmetre el fixa", async ({ page }) => {
    await page.goto("/?accent=4F46E5");
    const solid = () =>
      page.evaluate(() =>
        getComputedStyle(document.documentElement)
          .getPropertyValue("--chakra-colors-accent-solid")
          .trim()
          .toLowerCase(),
      );
    await expect.poll(solid).toBe("#4f46e5");
  });

  test("el text dels botons plens manté contrast amb el fons del botó", async ({ page }) => {
    await page.goto("/");
    const boto = page.getByRole("link", { name: ca.hero.contactar }).first();
    const [fg, bg] = await boto.evaluate((el) => {
      const s = getComputedStyle(el);
      return [s.color, s.backgroundColor];
    });
    expect(fg).not.toBe(bg);
    expect(bg).not.toBe("rgba(0, 0, 0, 0)");
  });
});
