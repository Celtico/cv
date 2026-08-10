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
import { svgMap } from "./svg";

// Ordre pensat per a qui llegeix això per decidir si et contracta: la prova de
// feina real (Featured) puja al davant, l'experiència deixa de ser la novena
// secció, i el llibre d'hores 2011–2021 deixa de ser l'última impressió abans
// del contacte.
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
            <Featured svgs={svgs} />
          </Reveal>
          <Reveal>
            <About />
          </Reveal>
          <Reveal>
            <Skills />
          </Reveal>
          <Reveal>
            <Experience />
          </Reveal>
          <Reveal>
            <Gallery />
          </Reveal>
          <Reveal>
            <Clients />
          </Reveal>
          <Reveal>
            <ClientHours />
          </Reveal>
          <Reveal>
            <Projects svgs={svgs} />
          </Reveal>
          <Contact />
        </Box>
        <SiteFooter />
      </Box>
    </LanguageProvider>
  );
}
