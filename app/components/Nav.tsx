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
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
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
      borderRadius="2px"
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
    <HStack spacing={0} border="1px solid" borderColor="border" borderRadius="2px" overflow="hidden">
      {LANGS.map((l: Lang) => (
        <Button
          key={l}
          as={NextLink}
          href={langHref(l, rest)}
          onClick={() => setLang(l)}
          hrefLang={l}
          size="xs"
          h="30px"
          minW="34px"
          px={2}
          borderRadius={0}
          variant="ghost"
          className="tnum"
          fontSize="0.66rem"
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

  // La barra s'amaga en baixar i torna a sortir en pujar.
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 4) {
        setHidden(y > lastY && y > 120);
        lastY = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Les àncores porten prefix perquè també han de funcionar des de /blog, i
  // porten l'idioma perquè si no et treuen de /es o /en i et tornen al català.
  const links = [
    { href: anchorHref(lang, "destacados"), label: t.nav.destacats },
    { href: anchorHref(lang, "sobre-mi"), label: t.nav.perfil },
    { href: anchorHref(lang, "skills"), label: t.nav.eines },
    { href: anchorHref(lang, "proyectos"), label: t.nav.projectes },
    { href: anchorHref(lang, "experiencia"), label: t.nav.trajectoria },
    { href: anchorHref(lang, "trayectoria"), label: t.nav.registre },
    { href: langHref(lang, "/blog"), label: t.nav.blog },
    { href: anchorHref(lang, "contacto"), label: t.nav.contacte },
  ];

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
      transform={hidden && !isOpen ? "translateY(-100%)" : "translateY(0)"}
      transition="transform .3s ease"
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

          <HStack spacing={6} display={{ base: "none", xl: "flex" }}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="tnum"
                fontSize="0.72rem"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color="fg.muted"
                _hover={{ color: "accent.fg", textDecoration: "none" }}
              >
                {l.label}
              </Link>
            ))}
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
              borderRadius="2px"
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
            <Text className="tnum" fontWeight="600" letterSpacing="0.15em" color="fg" lineHeight="1.4">
              CELESTÍ
              <br />
              TICÓ
              <br />
              PETIT
            </Text>
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
                  display="flex"
                  justifyContent="space-between"
                  _hover={{ color: "accent.fg", textDecoration: "none" }}
                >
                  <Box as="span">{l.label}</Box>
                  <Box as="span" color="fg.subtle">
                    {String(i + 1).padStart(2, "0")}
                  </Box>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
