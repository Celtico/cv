"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Nav } from "../components/Nav";
import { Contact } from "../components/Contact";
import { Reveal } from "../components/Reveal";
import { useLang, useT } from "../i18n";
import { blogPosts, type BlogPost } from "./posts";

function formatDate(iso: string, lang: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(
    lang === "en" ? "en-GB" : lang === "es" ? "es-ES" : "ca-ES",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

// Imatge amb vel del color d'accent; el hover retira el vel i mostra el color real.
function TintedImage({ src, alt, cover = false }: { src: string; alt: string; cover?: boolean }) {
  return (
    <Box role="group" position="relative" overflow="hidden" h={cover ? "full" : undefined}>
      <Image
        src={src}
        alt={alt}
        w="full"
        h={cover ? "full" : undefined}
        objectFit={cover ? "cover" : undefined}
        loading="lazy"
        filter="grayscale(1)"
        transition="filter .35s ease"
        _groupHover={{ filter: "none" }}
      />
      <Box
        position="absolute"
        inset={0}
        bg="accent.solid"
        opacity={0.9}
        transition="opacity .35s ease"
        pointerEvents="none"
        _groupHover={{ opacity: 0 }}
      />
    </Box>
  );
}

function PostImages({ post }: { post: BlogPost }) {
  if (post.images.length === 0) return null;
  const [first, ...rest] = post.images;
  return (
    // la meitat de la mida anterior (34,5rem)
    <VStack align="stretch" spacing={3} mb={7} maxW="17.25rem">
      <Box border="1px solid" borderColor="border.emphasized" borderRadius="2px" overflow="hidden">
        <TintedImage src={first.src} alt={first.alt} />
      </Box>
      {rest.length > 0 && (
        <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={3}>
          {rest.map((img) => (
            <Box key={img.src} border="1px solid" borderColor="border" borderRadius="2px" overflow="hidden">
              <TintedImage src={img.src} alt={img.alt} cover />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
}

function Post({ post, index }: { post: BlogPost; index: number }) {
  const { lang } = useLang();
  const t = useT();
  const c = post.content[lang];

  return (
    <Box
      as="article"
      id={post.slug}
      pt={{ base: 12, md: 16 }}
      mt={{ base: 12, md: 16 }}
      borderTop={index > 0 ? "1px solid" : undefined}
      borderColor="border"
      scrollMarginTop="0"
    >
      <Flex
        className="tnum"
        align="center"
        gap={3}
        fontSize="0.7rem"
        letterSpacing="0.14em"
        textTransform="uppercase"
        color="fg.muted"
        mb={4}
        flexWrap="wrap"
      >
        <Text as="time" dateTime={post.date} color="accent.fg">
          {t.blog.published} {formatDate(post.date, lang)}
        </Text>
        <Box w="1px" h="12px" bg="border.emphasized" />
        <Wrap spacing={2}>
          {c.tags.map((tag) => (
            <WrapItem key={tag}>
              <Text px={2} py={0.5} border="1px solid" borderColor="border" borderRadius="2px">
                {tag}
              </Text>
            </WrapItem>
          ))}
        </Wrap>
      </Flex>

      <Heading
        as="h2"
        fontWeight="500"
        fontSize={{ base: "1.9rem", md: "2.5rem" }}
        lineHeight="1.12"
        letterSpacing="-0.01em"
        color="fg"
        maxW="46rem"
        mb={6}
      >
        {c.title}
      </Heading>

      <PostImages post={post} />

      <VStack align="stretch" spacing={4} maxW="46rem">
        {c.body.map((p) => (
          <Text key={p.slice(0, 40)} color="fg.muted" lineHeight="1.8" whiteSpace="pre-line">
            {p}
          </Text>
        ))}
      </VStack>

    </Box>
  );
}

export function BlogClient() {
  const t = useT();

  return (
    <Box>
      <Nav />
      <Box as="main" bg="bg">
        <Container maxW="72rem" pt={{ base: 14, md: 20 }} pb={{ base: 16, md: 24 }}>
          <Flex align="center" gap={3} mb={5}>
            <Box as="span" className="tnum" fontSize="xs" color="accent.fg" letterSpacing="0.2em">
              §
            </Box>
            <Text
              as="span"
              className="tnum"
              fontSize="xs"
              fontWeight="500"
              letterSpacing="0.22em"
              textTransform="uppercase"
              color="fg.muted"
            >
              {t.blog.kicker}
            </Text>
            <Box flex="1" h="1px" bg="border.emphasized" />
          </Flex>

          <Heading
            as="h1"
            fontWeight="500"
            fontSize={{ base: "2.6rem", md: "3.8rem" }}
            lineHeight="1.02"
            letterSpacing="-0.02em"
            color="fg"
          >
            {t.blog.title}
          </Heading>
          <Text mt={5} color="fg.muted" fontSize={{ base: "md", md: "lg" }} maxW="42rem" lineHeight="1.7">
            {t.blog.subtitle}
          </Text>

          {blogPosts.map((post, i) => (
            <Reveal key={post.slug}>
              <Post post={post} index={i} />
            </Reveal>
          ))}
        </Container>
      </Box>
      <Contact />
    </Box>
  );
}
