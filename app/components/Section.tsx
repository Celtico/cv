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

  return (
    <Box
      as="section"
      id={id}
      py={{ base: 16, md: 24 }}
      bg={inverted ? "bg.inverted" : bg}
      color={inverted ? "fg.inverted" : "fg"}
      scrollMarginTop="72px"
    >
      <Container maxW="72rem">
        <Box mb={{ base: 10, md: 14 }}>
          {kicker && (
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
                color={kickColor}
              >
                {kicker}
              </Text>
              <Box flex="1" h="1px" bg={rule} />
            </Flex>
          )}
          <Heading
            as="h2"
            fontWeight="500"
            fontSize={{ base: "2.6rem", md: "3.8rem" }}
            lineHeight="1.02"
            letterSpacing="-0.02em"
            color={titleColor}
          >
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
