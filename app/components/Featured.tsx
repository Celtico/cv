"use client";

import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import { Section } from "./Section";
import { featured } from "../data";

export function Featured() {
  return (
    <Section
      id="destacados"
      kicker="Proyectos destacados"
      title="Aplicaciones en producción"
      subtitle="Dos plataformas reales que puedes visitar ahora mismo. Producto completo: front-end, back-end, IA e integración de ERP."
    >
      <VStack spacing={{ base: 12, md: 20 }} align="stretch">
        {featured.map((p, i) => {
          const reverse = i % 2 === 1;
          return (
            <Flex
              key={p.title}
              direction={{ base: "column", lg: reverse ? "row-reverse" : "row" }}
              gap={{ base: 8, lg: 14 }}
              align="center"
            >
              {/* Screenshot */}
              <Box flex="1.1" w="full">
                <Box
                  position="relative"
                  borderRadius="2xl"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  boxShadow="0 30px 80px -30px rgba(0,0,0,.8)"
                  transition="transform .3s"
                  _hover={{ transform: "translateY(-6px)" }}
                >
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient={`linear(to-br, ${p.accent}, transparent)`}
                    opacity={0.12}
                    pointerEvents="none"
                    zIndex={1}
                  />
                  <Link href={p.url} isExternal>
                    <AspectRatio ratio={16 / 10}>
                      <Image src={p.img} alt={p.title} objectFit="cover" objectPosition="top" />
                    </AspectRatio>
                  </Link>
                </Box>
              </Box>

              {/* Text */}
              <VStack flex="1" align="start" spacing={5}>
                <HStack spacing={3} flexWrap="wrap">
                  <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold">
                    {p.title}
                  </Text>
                  {p.badge && (
                    <Badge
                      px={3}
                      py={1}
                      borderRadius="full"
                      bg={p.accent}
                      color="ink.900"
                      fontWeight="bold"
                      textTransform="none"
                    >
                      {p.badge}
                    </Badge>
                  )}
                </HStack>
                <Text color={p.accent} fontWeight="semibold" mt={-2}>
                  {p.subtitle}
                </Text>
                <Text color="gray.300" lineHeight="1.8">
                  {p.desc}
                </Text>

                <List spacing={2.5}>
                  {p.highlights.map((h) => (
                    <ListItem key={h} color="gray.400" display="flex" alignItems="start">
                      <ListIcon as={FiCheckCircle} color={p.accent} mt={1} flexShrink={0} />
                      <Text as="span">{h}</Text>
                    </ListItem>
                  ))}
                </List>

                <Wrap spacing={2} pt={1}>
                  {p.stack.map((s) => (
                    <WrapItem key={s}>
                      <Tag size="sm" bg="whiteAlpha.100" color="gray.300" borderRadius="md">
                        {s}
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>

                <Button
                  as={Link}
                  href={p.url}
                  isExternal
                  size="lg"
                  mt={2}
                  bg={p.accent}
                  color="ink.900"
                  _hover={{ opacity: 0.9, textDecoration: "none" }}
                  rightIcon={<Icon as={FiArrowUpRight} />}
                  fontWeight="bold"
                >
                  Visitar {p.title.split(" ")[0]}
                </Button>
              </VStack>
            </Flex>
          );
        })}
      </VStack>
    </Section>
  );
}
