"use client";

import {
  AspectRatio,
  Box,
  Image,
  Link,
  SimpleGrid,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import { Section } from "./Section";
import { projects } from "../data";

export function Projects() {
  return (
    <Section
      id="proyectos"
      kicker="I+D y experimentos"
      title="Otros proyectos propios"
      subtitle="Investigación y experimentos técnicos fuera del trabajo de cliente."
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {projects.map((p) => (
          <Box
            key={p.title}
            bg="ink.700"
            border="1px solid"
            borderColor="whiteAlpha.100"
            borderRadius="2xl"
            overflow="hidden"
            transition="all .25s"
            _hover={{ borderColor: "brand.500", transform: "translateY(-6px)", boxShadow: "0 20px 60px -20px rgba(25,179,230,.35)" }}
          >
            <AspectRatio ratio={16 / 9}>
              <Image
                src={p.img}
                alt={p.title}
                objectFit="cover"
                objectPosition="top"
                loading="lazy"
              />
            </AspectRatio>
            <VStack align="start" spacing={4} p={{ base: 5, md: 7 }}>
              <Box>
                <HStack>
                  <Text fontSize="2xl" fontWeight="extrabold">
                    {p.title}
                  </Text>
                  {p.url && (
                    <Link href={p.url} isExternal color="brand.300">
                      <Icon as={FiExternalLink} />
                    </Link>
                  )}
                </HStack>
                <Text color="brand.300" fontWeight="medium">
                  {p.subtitle}
                </Text>
              </Box>
              <Text color="gray.400" lineHeight="1.7">
                {p.desc}
              </Text>
              <Wrap spacing={2}>
                {p.stack.map((s) => (
                  <WrapItem key={s}>
                    <Tag size="sm" bg="whiteAlpha.100" color="gray.300" borderRadius="md">
                      {s}
                    </Tag>
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
