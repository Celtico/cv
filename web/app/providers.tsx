"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { MotionConfig } from "framer-motion";
import theme from "./theme";

// L'idioma ja no viu aquí: el posa cada ruta amb <LanguageProvider initial>,
// perquè el servidor pugui renderitzar en la llengua de la URL.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ChakraProvider>
  );
}
