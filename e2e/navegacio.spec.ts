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

  test("les àncores de la navegació tenen la seva secció al document", async ({ page }) => {
    await page.goto("/");
    const ancores = ["#sobre-mi", "#skills", "#destacados", "#proyectos", "#experiencia", "#contacto"];
    for (const a of ancores) {
      await expect(page.locator(a)).toHaveCount(1);
    }
  });
});
