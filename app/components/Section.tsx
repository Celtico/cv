"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";

export function Section({
  id,
  kicker,
  title,
  subtitle,
  children,
  bg = "bg",
  inverted = false,
}: {
  id: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bg?: string;
  inverted?: boolean;
}) {
  const titleColor = inverted ? "fg.inverted" : "fg";
  const subColor = inverted ? "fg.inverted.muted" : "fg.muted";
  const kickColor = inverted ? "fg.inverted.muted" : "fg.muted";
  const rule = inverted ? "whiteAlpha.300" : "border.emphasized";
  // sobre el bloc invertit, accent.fg està calculat contra el fons contrari
  const markColor = inverted ? "accent.inverted" : "accent.fg";

  return (
    <Box
      as="section"
      id={id}
      py={{ base: 16, md: 24 }}
      bg={inverted ? "bg.inverted" : bg}
      color={inverted ? "fg.inverted" : "fg"}
      // la barra és sticky i fa 64 px: sense això el titular queda tapat en
      // arribar a l'àncora
      scrollMarginTop="80px"
    >
      <Container maxW="72rem">
        <Box mb={{ base: 10, md: 14 }}>
          {kicker && (
            <Flex align="center" gap={3} mb={5}>
              <Box as="span" className="tnum" fontSize="xs" color={markColor} letterSpacing="0.2em">
                §
              </Box>
              <Text as="span" className="tnum" textStyle="kicker" color={kickColor}>
                {kicker}
              </Text>
              <Box flex="1" h="1px" bg={rule} />
            </Flex>
          )}
          <Heading as="h2" textStyle="sectionTitle" color={titleColor}>
            {title}
          </Heading>
          {subtitle && (
            <Text mt={5} color={subColor} fontSize={{ base: "md", md: "lg" }} maxW="42rem" lineHeight="1.7">
              {subtitle}
            </Text>
          )}
        </Box>
        {children}
      </Container>
    </Box>
  );
}
