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
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiCornerDownRight } from "react-icons/fi";
import { Section } from "./Section";
import { featured } from "../data";
import { useT } from "../i18n";

const MotionBox = motion(Box);

function Plate({ src, alt, index, badge }: { src: string; alt: string; index: number; badge: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <Box ref={ref} border="1px solid" borderColor="lineStrong" borderRadius="2px" overflow="hidden">
      <Flex
        className="tnum"
        align="center"
        justify="space-between"
        px={4}
        py={2}
        bg="surfaceTint"
        borderBottom="1px solid"
        borderColor="line"
        fontSize="0.66rem"
        letterSpacing="0.14em"
        textTransform="uppercase"
        color="fgMuted"
      >
        <Text>Plate {String(index + 1).padStart(2, "0")}</Text>
        <Text color="accent">{badge}</Text>
      </Flex>
      <AspectRatio ratio={16 / 10} overflow="hidden">
        <MotionBox style={{ y }} w="full" h="112%">
          <Image src={src} alt={alt} w="full" h="full" objectFit="cover" objectPosition="top" />
        </MotionBox>
      </AspectRatio>
    </Box>
  );
}

export function Featured() {
  const t = useT();
  return (
    <Section id="destacados" kicker={t.featured.kicker} title={t.featured.title} subtitle={t.featured.subtitle} bg="canvas">
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
                  <Plate src={p.img} alt={p.title} index={i} badge={p.badge ?? t.featured.visitar} />
                </Link>
              </Box>

              <VStack flex="1" align="start" spacing={5} justify="center">
                <Box>
                  <Text className="tnum" fontSize="xs" letterSpacing="0.2em" textTransform="uppercase" color="accent" mb={2}>
                    {tr.subtitle}
                  </Text>
                  <Text fontFamily="heading" fontSize={{ base: "2.2rem", md: "2.8rem" }} lineHeight="1.05" color="fg">
                    {p.title}
                  </Text>
                </Box>
                <Text color="fgMuted" lineHeight="1.8">
                  {tr.desc}
                </Text>

                <List spacing={2.5}>
                  {tr.highlights.map((h) => (
                    <ListItem key={h} color="fgMuted" display="flex" alignItems="start" fontSize="0.95rem">
                      <ListIcon as={FiCornerDownRight} color="accent" mt={1} flexShrink={0} />
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

                <Button
                  as={Link}
                  href={p.url}
                  isExternal
                  mt={2}
                  bg="#E8A23D"
                  color="#141210"
                  borderRadius="2px"
                  h="48px"
                  px={5}
                  fontWeight="600"
                  _hover={{ bg: "#F0B662", textDecoration: "none" }}
                  rightIcon={<Icon as={FiArrowUpRight} />}
                >
                  {t.featured.visitar} {p.title.split(" ")[0]}
                </Button>
              </VStack>
            </Flex>
          );
        })}
      </VStack>
    </Section>
  );
}
