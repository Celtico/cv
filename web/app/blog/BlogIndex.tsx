"use client";

import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Nav } from "../components/Nav";
import { SiteFooter } from "../components/SiteFooter";
import { Contact } from "../components/Contact";
import { useLang, useT, langHref } from "../i18n";
import { TintedImage } from "./TintedImage";
import { blogPosts } from "./posts";
import { RichText } from "../components/RichText";
import { Kicker } from "../components/Kicker";

export function formatDate(iso: string, lang: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(
    lang === "en" ? "en-GB" : lang === "es" ? "es-ES" : "ca-ES",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

// L'índex ara enllaça cada entrada a la seva pàgina. Abans els sis posts vivien
// sencers en un sol document amb àncores #slug: per a un cercador eren la
// mateixa pàgina, i no es podia compartir una entrada concreta.
export function BlogIndex() {
  const t = useT();
  const { lang } = useLang();

  return (
    <Box>
      <Nav />
      <Box as="main" id="contingut" bg="bg">
        <Container maxW="72rem" pt={{ base: 14, md: 20 }} pb={{ base: 16, md: 24 }}>
          <Kicker>{t.blog.kicker}</Kicker>

          <Heading as="h1" textStyle="sectionTitle" color="fg">
            {t.blog.title}
          </Heading>
          <Text mt={5} color="fg.muted" fontSize={{ base: "md", md: "lg" }} maxW="42rem" lineHeight="1.7">
            <RichText>{t.blog.subtitle}</RichText>
          </Text>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 6, md: 8 }} mt={{ base: 12, md: 16 }}>
            {blogPosts.map((post) => {
              const c = post.content[lang];
              const img = post.images[0];
              return (
                <LinkBox as="article" key={post.slug} layerStyle="plate">
                  {img && (
                    // Marc fix per a totes les targetes: les imatges originals
                    // van de 646×348 a 537×632, i amb la proporció intrínseca
                    // la graella quedava desigual.
                    <Box borderBottom="1px solid" borderColor="border">
                      <AspectRatio ratio={16 / 10}>
                        <TintedImage src={img.src} alt={img.alt} width={img.width} height={img.height} cover />
                      </AspectRatio>
                    </Box>
                  )}
                  <Box p={{ base: 5, md: 6 }}>
                    <Flex
                      className="tnum"
                      align="center"
                      gap={3}
                      textStyle="micro"
                      color="fg.muted"
                      mb={3}
                      flexWrap="wrap"
                    >
                      <Text as="time" dateTime={post.date} color="accent.fg">
                        {formatDate(post.date, lang)}
                      </Text>
                      <Box w="1px" h="12px" bg="border.emphasized" />
                      <Wrap spacing={2}>
                        {c.tags.slice(0, 3).map((tag) => (
                          <WrapItem key={tag}>
                            <Text px={2} py={0.5} border="1px solid" borderColor="border" borderRadius="control">
                              {tag}
                            </Text>
                          </WrapItem>
                        ))}
                      </Wrap>
                    </Flex>

                    <Heading
                      as="h2"
                      textStyle="cardTitle"
                      fontSize={{ base: "1.35rem", md: "1.45rem" }}
                      color="fg"
                      mb={3}
                      noOfLines={3}
                    >
                      <LinkOverlay as={NextLink} href={langHref(lang, `/blog/${post.slug}`)}>
                        {c.title}
                      </LinkOverlay>
                    </Heading>

                    <Text color="fg.muted" lineHeight="1.7" noOfLines={4}>
                      {c.excerpt}
                    </Text>
                  </Box>
                </LinkBox>
              );
            })}
          </SimpleGrid>
        </Container>
      </Box>
      <Contact />
      <SiteFooter />
    </Box>
  );
}
