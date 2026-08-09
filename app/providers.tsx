"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { MotionConfig } from "framer-motion";
import theme from "./theme";
import { LanguageProvider } from "./i18n";
import { AccentProvider } from "./accent";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <AccentProvider>
        <LanguageProvider>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </LanguageProvider>
      </AccentProvider>
    </ChakraProvider>
  );
}
