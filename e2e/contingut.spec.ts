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
    // Les tres són dades del registre d'hores i han de quadrar amb el CV en
    // PDF. El «100%» que hi havia va sortir el 2026-08-18: no era una mesura.
    for (const xifra of ["422", "200+", "25"]) {
      await expect(page.getByText(xifra, { exact: true }).first()).toBeVisible();
    }
  });
});

test.describe("galeria", () => {
  // Les rajoles amb web viva són enllaços, i han de SER-HO per a qui fa servir
  // un lector de pantalla. Quan la rajola va passar a enllaç es va quedar amb
  // el `role="group"` que hi havia per a l'efecte de passada, i el `role`
  // anul·la el paper d'`<a>`: l'auditoria els llistava com a enllaços sense
  // nom. L'efecte ja no depèn de cap `role`, i això ho vigila.
  test("les captures amb web viva són enllaços de debò i tenen nom", async ({ page }) => {
    await page.goto("/");
    const enllacos = page.locator("#galeria a[href^='http']");
    const quants = await enllacos.count();
    expect(quants).toBeGreaterThan(0);

    for (let i = 0; i < quants; i++) {
      const a = enllacos.nth(i);
      expect(await a.getAttribute("role"), "cap role que li prengui el paper d'enllaç").toBeNull();
      expect((await a.innerText()).trim().length, "l'enllaç ha de tenir nom accessible").toBeGreaterThan(2);
    }
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

test.describe("accent per secció", () => {
  test("cada secció pinta el seu color i no el de la del costat", async ({ page }) => {
    await page.goto("/");
    const solid = (id: string) =>
      page.locator(`#${id}`).evaluate((el) =>
        getComputedStyle(el).getPropertyValue("--chakra-colors-accent-solid").trim().toLowerCase(),
      );
    // Els colors els reparteix `home.tsx` recorrent `ACCENT_SERIES` per ordre,
    // de manera que el que es comprova aquí és la POSICIÓ a la pàgina: la
    // primera secció duu el primer to de la sèrie, la segona el segon i la
    // vuitena l'últim. Si reordenes les seccions o la sèrie, canvia'ls aquí:
    // aquesta prova és la que detecta que el CSS d'accents ha deixat d'arribar
    // al marcatge.
    expect(await solid("destacados")).toBe("#2563eb"); // 1a — blau
    expect(await solid("sobre-mi")).toBe("#7c3aed"); // 2a — violeta
    expect(await solid("skills")).toBe("#16a34a"); // 3a — verd
    expect(await solid("proyectos")).toBe("#c026d3"); // 8a — fúcsia
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

test.describe("marcatge del diccionari", () => {
  // `content.ts` admet **negreta** i ==ressaltat==, i qualsevol superfície que
  // pinti aquell text sense passar per `RichText` (o sense `stripMarkup`, si va
  // a metadades) el treu literal. Ja va passar tres vegades: a la secció de
  // contacte, a la meta description i —el pitjor— a la llegenda d'una taula,
  // que només senten els lectors de pantalla i no es veu mirant la pàgina.
  for (const ruta of ["/", "/es", "/en", "/blog", "/es/blog", "/en/blog"]) {
    test(`cap marcador cru a ${ruta}`, async ({ page }) => {
      await page.goto(ruta);
      const superficies = await page.evaluate(() => {
        const atributs: string[] = [];
        for (const el of document.querySelectorAll("*")) {
          for (const a of ["alt", "title", "aria-label", "placeholder"]) {
            const v = el.getAttribute(a);
            if (v) atributs.push(v);
          }
        }
        return {
          "text visible i ocult": document.body.innerText,
          metadades: [...document.querySelectorAll("meta")]
            .map((m) => m.getAttribute("content") || "")
            .join(" | "),
          "dades estructurades": [...document.querySelectorAll('script[type="application/ld+json"]')]
            .map((s) => s.textContent)
            .join(" "),
          títol: document.title,
          atributs: atributs.join(" | "),
        };
      });
      for (const [on, valor] of Object.entries(superficies)) {
        expect(valor, `marcador cru a ${on}`).not.toMatch(/==|\*\*/);
      }
    });
  }
});
