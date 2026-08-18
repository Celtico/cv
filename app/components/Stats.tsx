"use client";

import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { stats } from "../data";
import { useT } from "../i18n";

export function Stats() {
  const t = useT();
  return (
    <Box bg="bg.subtle">
      <Container maxW="72rem" py={{ base: 8, md: 10 }}>
        <Flex direction={{ base: "column", md: "row" }} gap={{ base: 4, md: 0 }}>
          {stats.map((s, i) => (
            <Flex
              key={s.label}
              flex="1"
              align={{ base: "center", md: "start" }}
              justify={{ base: "space-between", md: "start" }}
              direction={{ md: "column" }}
              px={{ md: 8 }}
              py={{ base: 2, md: 0 }}
              pl={{ md: i === 0 ? 0 : 8 }}
              borderTop={{ base: i === 0 ? "none" : "1px solid", md: "none" }}
              borderLeft={{ md: i === 0 ? "none" : "1px solid" }}
              borderColor="border"
            >
              <Text
                className="tnum"
                fontSize={{ base: "2.4rem", md: "3rem" }}
                fontWeight="500"
                color="fg"
                lineHeight="1"
                letterSpacing="-0.02em"
              >
                {s.value}
              </Text>
              <Text
                className="tnum"
                mt={{ md: 2 }}
                color="fg.muted"
                fontSize="0.7rem"
                letterSpacing="0.14em"
                textTransform="uppercase"
              >
                {t.statLabels[i] ?? s.label}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
