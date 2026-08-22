"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { FiArrowUpRight, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { LANGS, type Lang } from "../content";
import { anchorHref, langHref, stripLang, useLang, useT } from "../i18n";

function ThemeToggle() {
  const { toggleColorMode } = useColorMode();
  const icon = useColorModeValue(<FiMoon />, <FiSun />);
  const label = useColorModeValue("Tema nit", "Tema dia");
  return (
    <IconButton
      aria-label={label}
      title={label}
      icon={icon}
      onClick={toggleColorMode}
      variant="ghost"
      color="fg"
      borderRadius="control"
      fontSize="18px"
      _hover={{ bg: "bg.muted", color: "accent.fg" }}
    />
  );
}

// Ara cada idioma és una URL de debò (/ · /es · /en), així que el commutador
// són enllaços i no un canvi d'estat: es poden compartir, indexar i obrir en
// una pestanya nova.
function LangSwitch() {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const rest = stripLang(pathname ?? "/");

  return (
    <HStack spacing={0} border="1px solid" borderColor="border" borderRadius="control" overflow="hidden">
      {LANGS.map((l: Lang) => (
        <Button
          key={l}
          as={NextLink}
          href={langHref(l, rest)}
          onClick={() => setLang(l)}
          hrefLang={l}
          size="xs"
          h="30px"
          minW="38px"
          px={2.5}
          borderRadius={0}
          variant="ghost"
          className="tnum"
          fontSize="xs"
          letterSpacing="0.08em"
          fontWeight={lang === l ? "600" : "400"}
          bg={lang === l ? "accent.fg" : "transparent"}
          color={lang === l ? "bg" : "fg.muted"}
          _hover={lang === l ? {} : { bg: "bg.muted", color: "fg" }}
          aria-current={lang === l ? "true" : undefined}
        >
          {l.toUpperCase()}
        </Button>
      ))}
    </HStack>
  );
}

export function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const t = useT();
  const { lang } = useLang();

  // La barra no s'amaga mai. Fins al 2026-08-22 es retirava en baixar i tornava
  // en pujar; amb cada banda duent el seu color, la barra hi ha de ser sempre
  // perquè és qui diu on ets.

  // Quina secció s'està mirant, i amb quin to. L'accent NO es dedueix aquí: es
  // llegeix del `data-accent` que ja escriu `Section`, de manera que qui
  // reparteix la sèrie segueix sent `home.tsx` i això no se n'ha d'assabentar.
  const [actiu, setActiu] = useState<{ id: string; accent: string } | null>(null);
  useEffect(() => {
    const seccions = Array.from(document.querySelectorAll<HTMLElement>("section[data-accent]"));
    if (!seccions.length) return;

    // La franja de decisió és la meitat de dalt de la finestra, just sota la
    // barra: activa la secció quan el seu titular hi arriba, no quan la secció
    // sencera hi cap —que amb bandes d'una pantalla no passaria mai—.
    const calcula = () => {
      const dalt = 65; // l'alçada real de la barra, filet inclòs (`--barra`)
      // La que creua la franja i queda més amunt guanya: en baixar, la nova
      // secció mana des que hi entra.
      let millor: HTMLElement | null = null;
      for (const s of seccions) {
        const r = s.getBoundingClientRect();
        if (r.top <= dalt + window.innerHeight * 0.4 && r.bottom > dalt) millor = s;
      }
      setActiu(millor ? { id: millor.id, accent: millor.dataset.accent ?? "blau" } : null);
    };

    // Es recalcula amb l'scroll i no només quan dispara l'observador. Amb
    // l'observador sol, la marca es podia quedar encallada: només salta quan
    // una secció creua el llindar, i qualsevol cosa que mogui l'scroll sense
    // creuar-ne cap —un salt instantani, el `Reveal` canviant alçades en
    // aparèixer, tornar a dalt de tot— la deixava on era.
    let pendent = 0;
    const onScroll = () => {
      if (pendent) return;
      pendent = requestAnimationFrame(() => {
        pendent = 0;
        calcula();
      });
    };
    // L'observador es queda com a xarxa per als canvis d'alçada (imatges,
    // `Reveal`) que no passen per l'scroll.
    const observer = new IntersectionObserver(calcula, {
      rootMargin: "-65px 0px -60% 0px",
      threshold: [0, 0.01, 0.5, 1],
    });
    for (const s of seccions) observer.observe(s);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    calcula();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (pendent) cancelAnimationFrame(pendent);
    };
  }, []);

  // Les àncores porten prefix perquè també han de funcionar des de /blog, i
  // porten l'idioma perquè si no et treuen de /es o /en i et tornen al català.
  // En l'ORDRE EN QUÈ APAREIXEN A LA PÀGINA. Anar a la barra i haver d'endevinar
  // on cau cada cosa és el que passava mentre «Projectes» sortia abans que
  // «Trajectòria» i el blog quedava enmig de les àncores. Galeria i Clients no
  // Hi són totes nou, Galeria i Clients incloses: no tenien entrada i eren
  // justament les dues seccions que no s'encenien mai a la barra.
  const links = [
    { id: "destacados", href: anchorHref(lang, "destacados"), label: t.nav.destacats },
    { id: "sobre-mi", href: anchorHref(lang, "sobre-mi"), label: t.nav.perfil },
    { id: "skills", href: anchorHref(lang, "skills"), label: t.nav.eines },
    { id: "experiencia", href: anchorHref(lang, "experiencia"), label: t.nav.trajectoria },
    { id: "galeria", href: anchorHref(lang, "galeria"), label: t.nav.galeria },
    { id: "clientes", href: anchorHref(lang, "clientes"), label: t.nav.clients },
    { id: "trayectoria", href: anchorHref(lang, "trayectoria"), label: t.nav.registre },
    { id: "proyectos", href: anchorHref(lang, "proyectos"), label: t.nav.projectes },
    { id: "contacto", href: anchorHref(lang, "contacto"), label: t.nav.contacte },
  ];

  // El blog va a part i al final: és l'únic que no és una àncora d'aquesta
  // pàgina sinó una altra pàgina. Amb el mateix aspecte que la resta, el clic
  // se sentia com un salt a mig text.
  const blog = { href: langHref(lang, "/blog"), label: t.nav.blog };

  // El nom del calaix fa d'inici, igual que el «CTP·» de la barra. Era text
  // mort: dins del calaix no hi havia manera de tornar a dalt sense tancar-lo i
  // fer scroll a mà.
  const inici = { href: anchorHref(lang, "top"), label: t.nav.inici };

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={100}
      bg="bg.nav"
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor="border"
    >
      <Container maxW="72rem">
        <Flex as="nav" h="64px" align="center" justify="space-between">
          <Link href={anchorHref(lang, "top")} _hover={{ textDecoration: "none" }}>
            <Text
              className="tnum"
              fontWeight="600"
              fontSize="sm"
              letterSpacing="0.15em"
              textTransform="uppercase"
              color="fg"
            >
              CTP
              <Box as="span" color="accent.fg">
                ·
              </Box>
            </Text>
          </Link>

          {/* Espaiat estret i FIX. Amb nou apartats i 1,5 rem entre tots, la
              fila demanava 1223 px i el commutador de tema quedava tallat.
              L'amplada de finestra no hi ajuda —el contenidor és de 72 rem, o
              sigui 1120 útils—, així que l'aire de pantalla ampla tampoc: si
              n'hi afegeixes un altre, el que toca és treure'n de la barra i
              deixar-los al calaix, no eixamplar el contenidor. */}
          <HStack spacing={3} display={{ base: "none", xl: "flex" }}>
            {links.map((l) => {
              const esActiu = !!l.id && l.id === actiu?.id;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="tnum"
                  // El `data-accent` va a l'ENLLAÇ, no a la barra: és el que fa
                  // que la regla `[data-accent="…"]` hi resolgui `accent.fg` i
                  // que, per tant, l'enllaç actiu es pinti amb el to de la
                  // secció on ets, sense que la barra hagi de saber cap hex.
                  data-accent={esActiu ? actiu.accent : undefined}
                  aria-current={esActiu ? "true" : undefined}
                  // Mida de l'escala, no escrita a mà: la resta de la pàgina va
                  // créixer i la barra s'hi va quedar a 11,5 px.
                  fontSize="xs"
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  color={esActiu ? "accent.fg" : "fg.muted"}
                  transition="color .25s ease"
                  _hover={{ color: "accent.fg", textDecoration: "none" }}
                >
                  {l.label}
                </Link>
              );
            })}

            {/* El filet separa les àncores del que se'n va a una altra pàgina. */}
            <Box w="1px" h="14px" bg="border" />
            <Link
              href={blog.href}
              className="tnum"
              fontSize="xs"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="fg"
              display="inline-flex"
              alignItems="center"
              gap={1.5}
              _hover={{ color: "accent.fg", textDecoration: "none" }}
            >
              {blog.label}
              <Icon as={FiArrowUpRight} aria-hidden boxSize="0.9em" />
            </Link>
          </HStack>

          <HStack spacing={2}>
            <LangSwitch />
            <ThemeToggle />
            <IconButton
              aria-label="menu"
              icon={<FiMenu />}
              variant="ghost"
              color="fg"
              fontSize="22px"
              borderRadius="control"
              display={{ base: "inline-flex", xl: "none" }}
              onClick={onOpen}
              _hover={{ bg: "bg.muted" }}
            />
          </HStack>
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <DrawerContent bg="bg.subtle" borderLeft="1px solid" borderColor="border">
          <DrawerCloseButton color="fg" mt={2} />
          <DrawerHeader>
            <Link
              href={inici.href}
              onClick={onClose}
              aria-label={inici.label}
              display="inline-block"
              _hover={{ color: "accent.fg", textDecoration: "none" }}
            >
              <Text className="tnum" fontWeight="600" letterSpacing="0.15em" color="inherit" lineHeight="1.4">
                CELESTÍ
                <br />
                TICÓ
                <br />
                PETIT
              </Text>
            </Link>
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={0} mt={2}>
              {links.map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  py={4}
                  borderTop={i === 0 ? "1px solid" : undefined}
                  borderBottom="1px solid"
                  borderColor="border"
                  className="tnum"
                  fontSize="sm"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  color="fg"
                  _hover={{ color: "accent.fg", textDecoration: "none" }}
                >
                  {/* Sense numerar: els apartats no són una seqüència que
                      s'hagi de seguir en ordre, igual que a Competències. */}
                  <Box as="span">{l.label}</Box>
                </Link>
              ))}
              {/* Igual que a la barra: separat i amb la fletxa, perquè es vegi
                  que no és una àncora d'aquesta pàgina. */}
              <Link
                href={blog.href}
                onClick={onClose}
                mt={6}
                py={4}
                px={5}
                borderRadius="control"
                border="1px solid"
                borderColor="border.emphasized"
                className="tnum"
                fontSize="sm"
                letterSpacing="0.1em"
                textTransform="uppercase"
                color="fg"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
                _hover={{ color: "accent.fg", borderColor: "accent.fg", textDecoration: "none" }}
              >
                {blog.label}
                <Icon as={FiArrowUpRight} aria-hidden boxSize="1em" />
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
