import { Box } from "@chakra-ui/react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Featured } from "./components/Featured";
import { Projects } from "./components/Projects";
import { Gallery } from "./components/Gallery";
import { Experience } from "./components/Experience";
import { ClientHours } from "./components/ClientHours";
import { Clients } from "./components/Clients";
import { Contact } from "./components/Contact";
import { SiteFooter } from "./components/SiteFooter";
import { Reveal } from "./components/Reveal";
import { LanguageProvider } from "./i18n";
import type { Lang } from "./content";
import { featured, projects } from "./data";
import { ACCENT_SERIES } from "./color";
import { svgMap } from "./svg";

// Ordre pensat per a qui llegeix això per decidir si et contracta: la prova de
// feina real (Featured) puja al davant, l'experiència deixa de ser la novena
// secció, i el llibre d'hores 2011–2021 deixa de ser l'última impressió abans
// del contacte.
//
// El color el reparteix AQUÍ i no cada secció. `ACCENT_SERIES` es recorre per
// ordre i, quan s'acaba, es repeteix: així el que mana és la POSICIÓ a la
// pàgina, no el tema de la secció. Si en reordenes una o n'afegeixes, els
// colors la segueixen sols i no cal tocar res més.
const to = (i: number) => ACCENT_SERIES[i % ACCENT_SERIES.length];

export function HomeShell({ lang }: { lang: Lang }) {
  // Les il·lustracions es llegeixen del disc en prerenderitzar i baixen als
  // components ja com a marcatge: abans sortien per fetch després d'hidratar.
  const svgs = svgMap([...featured.map((f) => f.img), ...projects.map((p) => p.img)]);

  return (
    <LanguageProvider initial={lang}>
      <Box>
        <Nav />
        <Box as="main" id="contingut">
          <Hero />
          <Stats />
          <Reveal>
            <Featured svgs={svgs} accent={to(0)} />
          </Reveal>
          <Reveal>
            <About accent={to(1)} />
          </Reveal>
          <Reveal>
            <Skills accent={to(2)} />
          </Reveal>
          <Reveal>
            <Experience accent={to(3)} />
          </Reveal>
          <Reveal>
            <Gallery accent={to(4)} />
          </Reveal>
          <Reveal>
            <Clients accent={to(5)} />
          </Reveal>
          <Reveal>
            <ClientHours accent={to(6)} />
          </Reveal>
          <Reveal>
            <Projects svgs={svgs} accent={to(7)} />
          </Reveal>
          <Contact />
        </Box>
        <SiteFooter />
      </Box>
    </LanguageProvider>
  );
}
