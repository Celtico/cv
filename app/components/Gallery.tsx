"use client";

import { AspectRatio, Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Section } from "./Section";
import { gallery } from "../data";

export function Gallery() {
  return (
    <Section
      id="galeria"
      kicker="Trabajo de cliente"
      title="Una muestra de 422 proyectos"
      subtitle="Webs, e-commerce y aplicaciones entregadas a más de 200 clientes."
      bg="ink.800"
    >
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
        {gallery.map((g, i) => (
          <Box
            key={i}
            position="relative"
            borderRadius="xl"
            overflow="hidden"
            border="1px solid"
            borderColor="whiteAlpha.100"
            role="group"
            cursor="default"
          >
            <AspectRatio ratio={4 / 3}>
              <Image
                src={g.img}
                alt={g.label}
                objectFit="cover"
                objectPosition="top"
                loading="lazy"
                transition="transform .4s"
                _groupHover={{ transform: "scale(1.06)" }}
              />
            </AspectRatio>
            <Box
              position="absolute"
              inset={0}
              bgGradient="linear(to-t, rgba(7,9,15,.9), transparent 60%)"
              opacity={0}
              transition="opacity .3s"
              _groupHover={{ opacity: 1 }}
              display="flex"
              alignItems="flex-end"
              p={4}
            >
              <Text fontWeight="bold" fontSize="sm">
                {g.label}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Section>
  );
}
