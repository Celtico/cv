"use client";

import { useRef } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Heading,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiCornerDownRight } from "react-icons/fi";
import { Section } from "./Section";
import { InlineSvg } from "./InlineSvg";
import { featured } from "../data";
import { useT } from "../i18n";

const MotionBox = motion(Box);

function Plate({
  src,
  alt,
  index,
  badge,
  markup,
}: {
  src: string;
  alt: string;
  index: number;
  badge: string;
  markup?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <Box ref={ref} layerStyle="plateTinted">
      <Flex
        className="tnum"
        align="center"
        justify="space-between"
        px={4}
        py={2}
        bg="accent.panel"
        borderBottom="1px solid"
        borderColor="border"
        fontSize="0.66rem"
        letterSpacing="0.14em"
        textTransform="uppercase"
        color="fg.muted"
      >
        <Text>Plate {String(index + 1).padStart(2, "0")}</Text>
        <Text color="accent.fg">{badge}</Text>
      </Flex>
      <AspectRatio ratio={16 / 10} overflow="hidden">
        <MotionBox style={{ y }} w="full" h="112%">
          {src.endsWith(".svg") ? (
            <InlineSvg src={src} title={alt} markup={markup} />
          ) : (
            <Image src={src} alt={alt} w="full" h="full" objectFit="cover" objectPosition="top" />
          )}
        </MotionBox>
      </AspectRatio>
    </Box>
  );
}

export function Featured({ svgs = {} }: { svgs?: Record<string, string> }) {
  const t = useT();
  return (
    <Section id="destacados" accent="featured" kickerTone="neutral" tone="wash" kicker={t.featured.kicker} title={t.featured.title} subtitle={t.featured.subtitle}>
      <VStack spacing={{ base: 14, md: 24 }} align="stretch">
        {featured.map((p, i) => {
          const tr = t.featured.items[i];
          const reverse = i % 2 === 1;
          return (
            <Flex
              key={p.title}
              direction={{ base: "column", lg: reverse ? "row-reverse" : "row" }}
              gap={{ base: 8, lg: 16 }}
              align="stretch"
            >
              <Box flex="1.15" w="full">
                <Link href={p.url} isExternal _hover={{ textDecoration: "none" }}>
                  <Plate src={p.img} alt={p.title} index={i} badge={p.badge ?? t.featured.visitar} markup={svgs[p.img]} />
                </Link>
              </Box>

              <VStack flex="1" align="start" spacing={5} justify="center">
                <Box>
                  <Text className="tnum" fontSize="xs" letterSpacing="0.2em" textTransform="uppercase" color="accent.fg" mb={2}>
                    {tr.subtitle}
                  </Text>
                  <Heading as="h3" textStyle="cardTitle" fontSize={{ base: "2.6rem", md: "3.4rem" }} lineHeight="1" color="fg">
                    {p.title}
                  </Heading>
                </Box>
                <Text color="fg.muted" lineHeight="1.8">
                  {tr.desc}
                </Text>

                <List spacing={2.5}>
                  {tr.highlights.map((h) => (
                    <ListItem key={h} color="fg.muted" display="flex" alignItems="start" fontSize="0.95rem">
                      <ListIcon as={FiCornerDownRight} color="accent.fg" mt={1} flexShrink={0} />
                      <Text as="span">{h}</Text>
                    </ListItem>
                  ))}
                </List>

                <Wrap spacing={2} pt={1}>
                  {p.stack.map((s) => (
                    <WrapItem key={s}>
                      <Text
                        className="tnum"
                        fontSize="0.72rem"
                        layerStyle="chip"
                      >
                        {s}
                      </Text>
                    </WrapItem>
                  ))}
                </Wrap>

                <Wrap spacing={3} pt={1}>
                  <WrapItem>
                    <Button
                      as={Link}
                      href="#contacto"
                      variant="pillSolid"
                      size="pill"
                    >
                      {t.featured.parlem}
                    </Button>
                  </WrapItem>
                  <WrapItem>
                    <Button
                      as={Link}
                      href={p.url}
                      isExternal
                      variant="pillOutline"
                      size="pill"
                      rightIcon={<Icon as={FiArrowUpRight} />}
                    >
                      {t.featured.visitar} {p.title.split(" ")[0]}
                    </Button>
                  </WrapItem>
                </Wrap>
              </VStack>
            </Flex>
          );
        })}
      </VStack>
    </Section>
  );
}
