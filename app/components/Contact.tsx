"use client";

import { Box, Button, Container, Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import { profile } from "../data";
import { useT } from "../i18n";

export function Contact() {
  const t = useT();
  return (
    <Box as="section" id="contacto" bg="gray.contrast" color="fg" scrollMarginTop="80px">
      <Container maxW="72rem" py={{ base: 20, md: 28 }}>
        <Flex
          className="tnum"
          align="center"
          gap={3}
          fontSize="xs"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color="fg.muted"
          mb={8}
        >
          <Box as="span" color="accent.fg">
            §
          </Box>
          <Text>{t.contact.kicker}</Text>
          <Box flex="1" h="1px" bg="border.emphasized" />
        </Flex>

        <Heading
          as="h2"
          fontWeight="400"
          fontSize={{ base: "2.6rem", md: "4.5rem" }}
          lineHeight="1"
          letterSpacing="-0.02em"
          color="fg"
          maxW="20ch"
        >
          {t.contact.t1}{" "}
          <Box as="span" fontStyle="italic">
            {t.contact.ti}
          </Box>{" "}
          {t.contact.t2}
        </Heading>

        <Text mt={6} color="fg.muted" fontSize={{ base: "md", md: "lg" }} maxW="34rem" lineHeight="1.7">
          {t.contact.subtitle}
        </Text>

        <Flex mt={10} gap={4} wrap="wrap" align="center">
          <Button
            as={Link}
            href={`mailto:${profile.email}`}
            bg="accent.solid"
            color="accent.contrast"
            borderRadius="2px"
            h="52px"
            px={6}
            fontWeight="600"
            rightIcon={<Icon as={FiArrowUpRight} />}
            _hover={{ bg: "accent.emphasized", textDecoration: "none" }}
            className="tnum"
          >
            {profile.email}
          </Button>
          <Link
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="tnum"
            color="fg"
            fontSize="lg"
            _hover={{ color: "accent.fg" }}
          >
            {profile.phone}
          </Link>
          <Button
            as={Link}
            href="/cv-celesti-tico.pdf"
            download
            variant="outline"
            borderColor="border.emphasized"
            color="fg"
            borderRadius="2px"
            h="52px"
            px={6}
            fontWeight="500"
            leftIcon={<Icon as={FiDownload} />}
            _hover={{ borderColor: "accent.fg", color: "accent.fg", textDecoration: "none" }}
          >
            {t.hero.descarregar}
          </Button>
        </Flex>

      </Container>
    </Box>
  );
}
