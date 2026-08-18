"use client";

import { AspectRatio, Box, Heading, Image, SimpleGrid, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { Section } from "./Section";
import { InlineSvg } from "./InlineSvg";
import { projects } from "../data";
import { useT } from "../i18n";

export function Projects({ svgs = {} }: { svgs?: Record<string, string> }) {
  const t = useT();
  // Nom, subtítol, descripció i stack surten del diccionari; de `data.ts` només
  // en surt la imatge. Els noms hi eren en castellà i es veien igual en català.
  const tr = (i: number) => t.projects.items[i];
  return (
    <Section id="proyectos" accent="projects" kicker={t.projects.kicker} title={t.projects.title} subtitle={t.projects.subtitle}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {projects.map((p, i) => (
          <Box key={p.img} layerStyle="plate">
            <Box borderBottom="1px solid" borderColor="border">
              <AspectRatio ratio={16 / 9}>
                {p.img.endsWith(".svg") ? (
                  <InlineSvg src={p.img} title={tr(i)?.title ?? p.title} markup={svgs[p.img]} />
                ) : (
                  <Image src={p.img} alt={tr(i)?.title ?? p.title} objectFit="cover" loading="lazy" />
                )}
              </AspectRatio>
            </Box>
            <VStack align="start" spacing={4} p={{ base: 5, md: 7 }}>
              <Box>
                <Text className="tnum" fontSize="xs" color="accent.fg" letterSpacing="0.16em" textTransform="uppercase" mb={2}>
                  {String(i + 1).padStart(2, "0")} · {t.projects.items[i]?.subtitle ?? p.subtitle}
                </Text>
                <Heading as="h3" textStyle="cardTitle" color="fg">
                  {tr(i)?.title ?? p.title}
                </Heading>
              </Box>
              <Text color="fg.muted" lineHeight="1.7">
                {t.projects.items[i]?.desc ?? p.desc}
              </Text>
              <Wrap spacing={2}>
                {(tr(i)?.stack ?? p.stack).map((s) => (
                  <WrapItem key={s}>
                    <Text
                      className="tnum"
                      layerStyle="chip"
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
