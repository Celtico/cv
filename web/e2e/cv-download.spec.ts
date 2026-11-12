import { expect, test } from "@playwright/test";

const PDF = "/cv-celesti-tico.pdf";

test.describe("descàrrega del CV en PDF", () => {
  test("el botó del hero apunta al PDF i té l'atribut download", async ({ page }) => {
    await page.goto("/");
    const boto = page.getByRole("link", { name: /descarregar cv/i }).first();
    await expect(boto).toBeVisible();
    await expect(boto).toHaveAttribute("href", PDF);
    await expect(boto).toHaveAttribute("download", /.*/);
  });

  test("també hi ha el botó a la secció de contacte", async ({ page }) => {
    await page.goto("/");
    const botons = page.getByRole("link", { name: /descarregar cv/i });
    await expect(botons).toHaveCount(2);
    await expect(botons.last()).toHaveAttribute("href", PDF);
  });

  test("el fitxer se serveix de debò i és un PDF", async ({ request }) => {
    const res = await request.get(PDF);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("pdf");

    // capçalera %PDF- i mida raonable: detecta un fitxer buit o corrupte
    const cos = await res.body();
    expect(cos.subarray(0, 5).toString()).toBe("%PDF-");
    expect(cos.byteLength).toBeGreaterThan(100_000);
  });

  test("el text del botó es tradueix", async ({ page }) => {
    await page.goto("/");
    for (const [codi, text] of [
      ["ES", /descargar cv/i],
      ["EN", /download cv/i],
      ["CA", /descarregar cv/i],
    ] as const) {
      await page.getByRole("link", { name: codi, exact: true }).click();
      await expect(page.getByRole("link", { name: text }).first()).toBeVisible();
    }
  });
});
