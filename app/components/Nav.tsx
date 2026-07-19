"use client";

import {
  Box,
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
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

const links = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#skills", label: "Skills" },
  { href: "#destacados", label: "Destacados" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#trayectoria", label: "Trayectoria" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={100}
      bg="rgba(7,9,15,0.72)"
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
    >
      <Container maxW="6xl">
        <Flex h="64px" align="center" justify="space-between">
          <Link href="#top" _hover={{ textDecoration: "none" }}>
            <Text fontWeight="extrabold" fontSize="lg" letterSpacing="tight">
              Cel
              <Box as="span" color="brand.400">
                .
              </Box>
            </Text>
          </Link>

          {/* Desktop links */}
          <HStack spacing={7} display={{ base: "none", md: "flex" }}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                fontSize="sm"
                color="gray.300"
                fontWeight="medium"
                _hover={{ color: "brand.300", textDecoration: "none" }}
              >
                {l.label}
              </Link>
            ))}
          </HStack>

          {/* Mobile burger */}
          <IconButton
            aria-label="Abrir menú"
            icon={<FiMenu />}
            variant="ghost"
            color="gray.200"
            fontSize="22px"
            display={{ base: "inline-flex", md: "none" }}
            onClick={onOpen}
            _hover={{ bg: "whiteAlpha.100" }}
          />
        </Flex>
      </Container>

      {/* Mobile drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay bg="blackAlpha.700" backdropFilter="blur(4px)" />
        <DrawerContent bg="ink.800" borderLeft="1px solid" borderColor="whiteAlpha.100">
          <DrawerCloseButton color="gray.300" mt={2} />
          <DrawerHeader>
            <Text fontWeight="extrabold" fontSize="lg">
              Cel
              <Box as="span" color="brand.400">
                .
              </Box>
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={1} mt={2}>
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  py={3}
                  px={3}
                  borderRadius="md"
                  fontSize="lg"
                  fontWeight="semibold"
                  color="gray.200"
                  _hover={{ bg: "whiteAlpha.100", color: "brand.300", textDecoration: "none" }}
                >
                  {l.label}
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
