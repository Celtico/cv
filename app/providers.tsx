"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { MotionConfig } from "framer-motion";
import theme from "./theme";
import { LanguageProvider } from "./i18n";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <LanguageProvider>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LanguageProvider>
    </ChakraProvider>
  );
}
