"use client";

import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { stats } from "../data";

export function Stats() {
  return (
    <Box borderY="1px solid" borderColor="whiteAlpha.100" bg="ink.800">
      <Container maxW="6xl" py={{ base: 10, md: 14 }}>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 6, md: 8 }}>
          {stats.map((s) => (
            <Box key={s.label} textAlign="center">
              <Text
                fontSize={{ base: "4xl", md: "5xl" }}
                fontWeight="black"
                bgGradient="linear(to-r, brand.300, purple.300)"
                bgClip="text"
                lineHeight="1"
              >
                {s.value}
              </Text>
              <Text mt={2} color="gray.400" fontSize={{ base: "xs", md: "sm" }} fontWeight="medium">
                {s.label}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
