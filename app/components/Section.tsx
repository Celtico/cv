"use client";

import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

export function Section({
  id,
  kicker,
  title,
  subtitle,
  children,
  bg,
}: {
  id: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <Box as="section" id={id} py={{ base: 16, md: 24 }} bg={bg} scrollMarginTop="72px">
      <Container maxW="6xl">
        <VStack align="start" spacing={3} mb={{ base: 8, md: 12 }}>
          {kicker && (
            <Text
              fontSize="sm"
              fontWeight="bold"
              letterSpacing="widest"
              textTransform="uppercase"
              color="brand.400"
            >
              {kicker}
            </Text>
          )}
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="extrabold"
            lineHeight="1.1"
          >
            {title}
          </Heading>
          {subtitle && (
            <Text color="gray.400" fontSize={{ base: "md", md: "lg" }} maxW="3xl">
              {subtitle}
            </Text>
          )}
        </VStack>
        {children}
      </Container>
    </Box>
  );
}
