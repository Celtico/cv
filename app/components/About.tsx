"use client";

import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import Image from "next/image";
import { RichText } from "./RichText";
import { Section } from "./Section";
import { useT } from "../i18n";

export function About() {
  const t = useT();
  return (
    <Section id="sobre-mi" accent="about" kickerTone="contrast" kicker={t.about.kicker} title={t.about.title}>
      <Grid templateColumns={{ base: "1fr", md: "1.6fr 1fr" }} gap={{ base: 10, md: 16 }}>
        <Box>
          <Text
            fontFamily="heading"
            fontWeight="400"
            fontSize={{ base: "1.5rem", md: "1.9rem" }}
            lineHeight="1.4"
            color="fg"
            mb={6}
          >
            <RichText>{t.about.p1}</RichText>
          </Text>
          <Text color="fg.muted" fontSize={{ base: "md", md: "lg" }} lineHeight="1.8">
            <RichText>{t.about.p2}</RichText>
          </Text>
        </Box>

        <Box>
          <Box
            position="relative"
            w="full"
            maxW="70px"
            aspectRatio="1"
            mb={8}
            overflow="hidden"
            borderRadius="full"
            border="1px solid"
            borderColor="border.emphasized"
          >
            <Image
              src="/img/cel-tico-petit.webp"
              alt="Celestí Ticó Petit"
              fill
              sizes="70px"
              style={{ objectFit: "cover" }}
            />
          </Box>

          <Text
            className="tnum"
            fontSize="xs"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="fg.muted"
            mb={4}
          >
            {t.about.idiomes}
          </Text>
          {t.about.languages.map((l, i) => (
            <Flex
              key={l.name}
              justify="space-between"
              align="baseline"
              py={4}
              borderTop={i === 0 ? "1px solid" : undefined}
              borderBottom="1px solid"
              borderColor="border.emphasized"
            >
              <Text fontFamily="heading" fontSize="lg" color="fg">
                {l.name}
              </Text>
              <Text className="tnum" fontSize="xs" letterSpacing="0.1em" textTransform="uppercase" color="fg.muted">
                {l.level}
              </Text>
            </Flex>
          ))}
        </Box>
      </Grid>
    </Section>
  );
}
