import { Box } from "@chakra-ui/react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Lighthouse } from "./components/Lighthouse";
import { Featured } from "./components/Featured";
import { Projects } from "./components/Projects";
import { Gallery } from "./components/Gallery";
import { Experience } from "./components/Experience";
import { ClientHours } from "./components/ClientHours";
import { Clients } from "./components/Clients";
import { Contact } from "./components/Contact";
import { Reveal } from "./components/Reveal";

export default function Home() {
  return (
    <Box>
      <Nav />
      <Box as="main">
        <Hero />
        <Stats />
        <Reveal><About /></Reveal>
        <Reveal><Skills /></Reveal>
        <Reveal><Lighthouse /></Reveal>
        <Reveal><Featured /></Reveal>
        <Reveal><Projects /></Reveal>
        <Reveal><Gallery /></Reveal>
        <Reveal><Experience /></Reveal>
        <Reveal><ClientHours /></Reveal>
        <Reveal><Clients /></Reveal>
      </Box>
      <Reveal><Contact /></Reveal>
    </Box>
  );
}
