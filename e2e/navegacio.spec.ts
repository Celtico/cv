import { expect, test } from "@playwright/test";

test.describe("rutes i navegació", () => {
  test("la portada carrega amb el nom i el títol", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Celestí");
    await expect(page).toHaveTitle(/Celestí Ticó Petit/);
  });

  test("una ruta inexistent redirigeix a l'inici en comptes de fer 404", async ({ page }) => {
    const res = await page.goto("/aquesta-ruta-no-existeix");
    expect(res?.status()).toBe(200);
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Celestí");
    // el 404 per defecte de Next no ha d'aparèixer enlloc
    await expect(page.getByText(/could not be found/i)).toHaveCount(0);
  });

  // Derivat dels href reals de la barra: així el test creix sol quan s'afegeix
  // o es reordena una secció, en comptes de quedar-se amb una llista a mà que
  // en cobria sis de deu.
  test("cada àncora de la navegació té la seva secció al document", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page.locator("header nav a[href^='/#']").evaluateAll((as) =>
      Array.from(new Set(as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!))),
    );
    expect(hrefs.length).toBeGreaterThanOrEqual(6);
    for (const href of hrefs) {
      await expect(page.locator(href.replace("/", ""))).toHaveCount(1);
    }
  });

  test("el salt al contingut apareix en tabular i porta al main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /vés al contingut/i });
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute("href", "#contingut");
    await expect(page.locator("main#contingut")).toHaveCount(1);
  });

  // En pantalla petita els enllaços viuen dins del calaix, no a la barra:
  // aquest ajudant retorna el conjunt clicable sigui quin sigui el viewport.
  async function obreNavegacio(page: import("@playwright/test").Page) {
    const menu = page.getByRole("button", { name: "menu" });
    if (await menu.isVisible()) {
      await menu.click();
      const calaix = page.getByRole("dialog");
      await expect(calaix).toBeVisible();
      return calaix;
    }
    return page.locator("header nav");
  }

  // Regressió: els enllaços de la barra estaven escrits amb "/" fix, així que
  // des de /en o /es et tornaven a la portada catalana.
  test("la barra conserva l'idioma en navegar", async ({ page }) => {
    for (const lang of ["es", "en"] as const) {
      await page.goto(`/${lang}`);

      const hrefs = await page
        .locator("header nav a")
        .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href") ?? ""));
      const interns = hrefs.filter((h) => h.startsWith("/"));
      expect(interns.length).toBeGreaterThan(5);
      for (const h of interns) {
        // cap enllaç de secció pot apuntar a l'arrel catalana...
        if (h.startsWith("/#")) throw new Error(`enllaç sense idioma a /${lang}: ${h}`);
        // ...tret dels del propi commutador, que hi han d'anar a posta
        if (!h.startsWith(`/${lang}`) && !["/", "/es", "/en"].includes(h)) {
          throw new Error(`enllaç fora d'idioma a /${lang}: ${h}`);
        }
      }

      // i en clicar-ne un, s'hi queda
      const nav = await obreNavegacio(page);
      await nav.locator(`a[href="/${lang}#skills"]`).click();
      await expect(page).toHaveURL(new RegExp(`/${lang}#skills$`));
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
    }
  });

  test("des del blog, la barra torna a la portada del mateix idioma", async ({ page }) => {
    await page.goto("/en/blog");
    const nav = await obreNavegacio(page);
    await nav.locator('a[href="/en#destacados"]').click();
    await expect(page).toHaveURL(/\/en#destacados$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("hi ha els landmarks bàsics una sola vegada", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    await expect(page.locator("header")).toHaveCount(1);
  });
});
