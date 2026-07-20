"use client";

import { Box, Button, Container, Flex, HStack, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { FiArrowUpRight, FiDownload, FiGlobe } from "react-icons/fi";
import { profile } from "../data";
import { useT } from "../i18n";

export function Contact() {
  const t = useT();
  return (
    <Box as="section" id="contacto" bg="invBg" color="invFg">
      <Container maxW="72rem" py={{ base: 20, md: 28 }}>
        <Flex
          className="tnum"
          align="center"
          gap={3}
          fontSize="xs"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color="invMuted"
          mb={8}
        >
          <Box as="span" color="invAccent">
            §
          </Box>
          <Text>{t.contact.kicker}</Text>
          <Box flex="1" h="1px" bg="invLine" />
        </Flex>

        <Heading
          as="h2"
          fontWeight="400"
          fontSize={{ base: "2.6rem", md: "4.5rem" }}
          lineHeight="1"
          letterSpacing="-0.02em"
          color="invFg"
          maxW="20ch"
        >
          {t.contact.t1}{" "}
          <Box as="span" fontStyle="italic">
            {t.contact.ti}
          </Box>{" "}
          {t.contact.t2}
        </Heading>

        <Text mt={6} color="invMuted" fontSize={{ base: "md", md: "lg" }} maxW="34rem" lineHeight="1.7">
          {t.contact.subtitle}
        </Text>

        <Flex mt={10} gap={4} wrap="wrap" align="center">
          <Button
            as={Link}
            href={`mailto:${profile.email}`}
            bg="invAccent"
            color="invBg"
            borderRadius="2px"
            h="52px"
            px={6}
            fontWeight="600"
            rightIcon={<Icon as={FiArrowUpRight} />}
            _hover={{ opacity: 0.9, textDecoration: "none" }}
            className="tnum"
          >
            {profile.email}
          </Button>
          <Link
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="tnum"
            color="invFg"
            fontSize="lg"
            _hover={{ color: "invAccent" }}
          >
            {profile.phone}
          </Link>
          <Button
            as={Link}
            href="/cv-celesti-tico.pdf"
            download
            variant="outline"
            borderColor="invLine"
            color="invFg"
            borderRadius="2px"
            h="52px"
            px={6}
            fontWeight="500"
            leftIcon={<Icon as={FiDownload} />}
            _hover={{ borderColor: "invAccent", color: "invAccent", textDecoration: "none" }}
          >
            {t.hero.descarregar}
          </Button>
        </Flex>

        <Flex
          mt={{ base: 16, md: 24 }}
          pt={8}
          borderTop="1px solid"
          borderColor="invLine"
          justify="space-between"
          align="center"
          wrap="wrap"
          gap={4}
          className="tnum"
          fontSize="xs"
          letterSpacing="0.12em"
          textTransform="uppercase"
          color="invMuted"
        >
          <Text>© Celestí Ticó Petit · {profile.location}</Text>
          <HStack spacing={6}>
            <Link href={profile.company} isExternal _hover={{ color: "invAccent" }}>
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
