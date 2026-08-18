"use client";

// Peu de lloc. Viu fora del <main> a posta: així és un landmark `contentinfo`
// de debò i el bloc de contacte pot quedar dins del contingut principal, on li
// toca. Abans tot això penjava del final de <Contact/>, fora de qualsevol
// landmark.

import { Box, Container, Flex, HStack, Icon, Link, Text } from "@chakra-ui/react";
import { FiGlobe, FiLinkedin } from "react-icons/fi";
import { profile } from "../data";

export function SiteFooter() {
  return (
    <Box as="footer" bg="bg" color="fg">
      <Container maxW="72rem" pb={{ base: 10, md: 14 }}>
        <Flex
          pt={8}
          borderTop="1px solid"
          borderColor="border.emphasized"
          justify="space-between"
          align="center"
          wrap="wrap"
          gap={4}
          className="tnum"
          fontSize="xs"
          letterSpacing="0.12em"
          textTransform="uppercase"
          color="fg.muted"
        >
          <Text>© Celestí Ticó Petit · {profile.location}</Text>
          {/* La secció sencera dedicada a l'auditoria s'ha retirat de la
              portada: cap contractació depèn d'un Lighthouse i ocupava el lloc
              just abans dels projectes. Aquí queda com a nota verificable. */}
          <Link
            href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fserverscel.com"
            isExternal
            _hover={{ color: "accent.fg" }}
          >
            Lighthouse 100 · 100 · 100 · 100
          </Link>
          <HStack spacing={6}>
            {/* El recorregut real d'un reclutador és LinkedIn → web → LinkedIn.
                Abans no hi havia cap enllaç de tornada en tot el lloc. */}
            <Link href={profile.linkedin} isExternal _hover={{ color: "accent.fg" }}>
              <HStack spacing={1.5}>
                <Icon as={FiLinkedin} />
                <Text>LinkedIn</Text>
              </HStack>
            </Link>
            <Link href={profile.company} isExternal _hover={{ color: "accent.fg" }}>
              <HStack spacing={1.5}>
                <Icon as={FiGlobe} />
                <Text>cenics.net</Text>
              </HStack>
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
