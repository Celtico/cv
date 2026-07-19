"use client";

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
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { LANGS, type Lang } from "../content";
import { useLang, useT } from "../i18n";

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
      _hover={{ bg: "surfaceTint", color: "accent" }}
    />
  );
}

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <HStack spacing={0} border="1px solid" borderColor="line" borderRadius="2px" overflow="hidden">
      {LANGS.map((l: Lang) => (
        <Button
          key={l}
          onClick={() => setLang(l)}
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
          bg={lang === l ? "accent" : "transparent"}
          color={lang === l ? "canvas" : "fgMuted"}
          _hover={lang === l ? {} : { bg: "surfaceTint", color: "fg" }}
          aria-pressed={lang === l}
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
  const barBg = useColorModeValue("rgba(236,229,213,0.8)", "rgba(20,18,16,0.78)");

  const links = [
    { href: "#sobre-mi", label: t.nav.perfil },
    { href: "#skills", label: t.nav.eines },
    { href: "#calidad", label: t.nav.qualitat },
    { href: "#destacados", label: t.nav.destacats },
    { href: "#proyectos", label: t.nav.projectes },
    { href: "#experiencia", label: t.nav.trajectoria },
    { href: "#trayectoria", label: t.nav.registre },
    { href: "#contacto", label: t.nav.contacte },
  ];

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={100}
      bg={barBg}
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor="line"
    >
      <Container maxW="72rem">
        <Flex h="64px" align="center" justify="space-between">
          <Link href="#top" _hover={{ textDecoration: "none" }}>
            <Text
              className="tnum"
              fontWeight="600"
              fontSize="sm"
              letterSpacing="0.15em"
              textTransform="uppercase"
              color="fg"
            >
              CTP
              <Box as="span" color="accent">
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
                color="fgMuted"
                _hover={{ color: "accent", textDecoration: "none" }}
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
              _hover={{ bg: "surfaceTint" }}
            />
          </HStack>
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <DrawerContent bg="canvasAlt" borderLeft="1px solid" borderColor="line">
          <DrawerCloseButton color="fg" mt={2} />
          <DrawerHeader>
            <Text className="tnum" fontWeight="600" letterSpacing="0.15em" color="fg">
              CELESTÍ TICÓ PETIT
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
                  borderColor="line"
                  className="tnum"
                  fontSize="sm"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  color="fg"
                  display="flex"
                  justifyContent="space-between"
                  _hover={{ color: "accent", textDecoration: "none" }}
                >
                  <Box as="span">{l.label}</Box>
                  <Box as="span" color="fgFaint">
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
