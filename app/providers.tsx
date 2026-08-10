"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { MotionConfig } from "framer-motion";
import theme from "./theme";
import { AccentProvider } from "./accent";

// L'idioma ja no viu aquí: el posa cada ruta amb <LanguageProvider initial>,
// perquè el servidor pugui renderitzar en la llengua de la URL.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <AccentProvider>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </AccentProvider>
    </ChakraProvider>
  );
}
