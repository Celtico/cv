"use client";

import { AspectRatio, Box, Image, SimpleGrid, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { Section } from "./Section";
import { projects } from "../data";
import { useT } from "../i18n";

export function Projects() {
  const t = useT();
  return (
    <Section id="proyectos" kicker={t.projects.kicker} title={t.projects.title} subtitle={t.projects.subtitle} bg="canvasAlt">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {projects.map((p, i) => (
          <Box key={p.title} border="1px solid" borderColor="lineStrong" borderRadius="2px" overflow="hidden" bg="surface">
            <Box borderBottom="1px solid" borderColor="line">
              <AspectRatio ratio={16 / 9}>
                <Image src={p.img} alt={p.title} objectFit="cover" loading="lazy" />
              </AspectRatio>
            </Box>
            <VStack align="start" spacing={4} p={{ base: 5, md: 7 }}>
              <Box>
                <Text className="tnum" fontSize="xs" color="accent" letterSpacing="0.16em" textTransform="uppercase" mb={2}>
                  {String(i + 1).padStart(2, "0")} · {t.projects.items[i]?.subtitle ?? p.subtitle}
                </Text>
                <Text fontFamily="heading" fontSize="1.9rem" lineHeight="1.1" color="fg">
                  {p.title}
                </Text>
              </Box>
              <Text color="fgMuted" lineHeight="1.7">
                {t.projects.items[i]?.desc ?? p.desc}
              </Text>
              <Wrap spacing={2}>
                {p.stack.map((s) => (
                  <WrapItem key={s}>
                    <Text
                      className="tnum"
                      fontSize="0.72rem"
                      color="fgMuted"
                      px={2}
                      py={1}
                      border="1px solid"
                      borderColor="line"
                      borderRadius="2px"
                    >
                      {s}
                    </Text>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Section>
  );
}
