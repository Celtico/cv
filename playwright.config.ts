import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;
// Directori de build propi dels tests: així no trepitgen el `.next` que pugui
// estar servint un servidor obert en una altra terminal.
const DIST = ".next-e2e";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    // El provider tria idioma a partir de navigator.language quan no hi ha res
    // desat: el fixem perquè l'idioma inicial sigui determinista als tests.
    locale: "ca-ES",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
  // Port propi perquè els tests no xoquin amb un `npm run dev` obert al 3000.
  // El projecte fa servir output:"standalone", on `next start` no funciona: cal
  // muntar la carpeta standalone tal com fa el Dockerfile i arrencar server.js,
  // que és exactament el que corre en producció.
  webServer: {
    // Els `rm -rf` són imprescindibles: sense ells, `cp -r origen destí/` niua
    // (static/static) quan el destí ja existeix i el servidor acaba servint
    // HTML antic que apunta a chunks inexistents — tot 500 i pàgina en blanc.
    command: [
      `NEXT_DIST_DIR=${DIST} npm run build`,
      `rm -rf ${DIST}/standalone/public ${DIST}/standalone/${DIST}/static`,
      `cp -r public ${DIST}/standalone/public`,
      `cp -r ${DIST}/static ${DIST}/standalone/${DIST}/static`,
      `PORT=${PORT} node ${DIST}/standalone/server.js`,
    ].join(" && "),
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
