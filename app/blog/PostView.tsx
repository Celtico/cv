"use client";

import { Box, Container, Flex, Heading, Icon, Link, SimpleGrid, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import NextLink from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { Nav } from "../components/Nav";
import { SiteFooter } from "../components/SiteFooter";
import { Contact } from "../components/Contact";
import { useLang, useT, langHref } from "../i18n";
import { TintedImage } from "./TintedImage";
import { formatDate } from "./BlogIndex";
import { type BlogPost } from "./posts";

export function PostView({ post }: { post: BlogPost }) {
  const t = useT();
  const { lang } = useLang();
  const c = post.content[lang];
  const [first, ...rest] = post.images;

  return (
    <Box>
      <Nav />
      <Box as="main" id="contingut" bg="bg">
        <Container maxW="72rem" pt={{ base: 14, md: 20 }} pb={{ base: 16, md: 24 }}>
          <Link
            as={NextLink}
            href={langHref(lang, "/blog")}
            display="inline-flex"
            alignItems="center"
            gap={2}
            className="tnum"
            textStyle="micro"
            color="fg.muted"
            mb={8}
            _hover={{ color: "accent.fg" }}
          >
            <Icon as={FiArrowLeft} />
            {t.blog.title}
          </Link>

          <Box as="article">
            <Flex
              className="tnum"
              align="center"
              gap={3}
              textStyle="micro"
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
                    <Text px={2} py={0.5} border="1px solid" borderColor="border" borderRadius="control">
                      {tag}
                    </Text>
                  </WrapItem>
                ))}
              </Wrap>
            </Flex>

            <Heading
              as="h1"
              fontWeight="500"
              fontSize={{ base: "2.2rem", md: "3.2rem" }}
              lineHeight="1.08"
              letterSpacing="-0.02em"
              color="fg"
              maxW="46rem"
              mb={7}
            >
              {c.title}
            </Heading>

            {first && (
              <VStack align="stretch" spacing={3} mb={8} maxW="34.5rem">
                <Box border="1px solid" borderColor="border.emphasized" borderRadius="plate" overflow="hidden">
                  <TintedImage src={first.src} alt={first.alt} width={first.width} height={first.height} />
                </Box>
                {rest.length > 0 && (
                  <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={3}>
                    {rest.map((img) => (
                      <Box key={img.src} border="1px solid" borderColor="border" borderRadius="plate" overflow="hidden">
                        <TintedImage src={img.src} alt={img.alt} width={img.width} height={img.height} cover />
                      </Box>
                    ))}
                  </SimpleGrid>
                )}
              </VStack>
            )}

            <VStack align="stretch" spacing={4} maxW="46rem">
              {c.body.map((p) => (
                <Text key={p.slice(0, 40)} color="fg.muted" lineHeight="1.8" whiteSpace="pre-line" fontSize="1.05rem">
                  {p}
                </Text>
              ))}
            </VStack>

          </Box>

          {/* Al final de l'entrada, les dues sortides: tornar a la llista i
              tornar al CV. La de dalt serveix abans de llegir; aquesta, després. */}
          <Flex
            mt={{ base: 12, md: 16 }}
            pt={8}
            borderTop="1px solid"
            borderColor="border"
            justify="space-between"
            align="center"
            gap={4}
            wrap="wrap"
          >
            <Link
              as={NextLink}
              href={langHref(lang, "/blog")}
              display="inline-flex"
              alignItems="center"
              gap={2}
              className="tnum"
              textStyle="micro"
              color="accent.fg"
              _hover={{ textDecoration: "underline" }}
            >
              <Icon as={FiArrowLeft} />
              {t.blog.title}
            </Link>
            <Link
              as={NextLink}
              href={langHref(lang)}
              className="tnum"
              textStyle="micro"
              color="fg.muted"
              _hover={{ color: "accent.fg" }}
            >
              {t.blog.backHome}
            </Link>
          </Flex>
        </Container>
      </Box>
      <Contact />
      <SiteFooter />
    </Box>
  );
}
