"use client";

// Selector del color principal de la web, al peu de pàgina. El color triat
// es propaga als tokens d'accent (vegeu app/accent.tsx) i es recorda; si el
// visitant no tria mai res, cada visita arrenca amb un color a l'atzar.

import { useEffect, useState } from "react";
import { Box, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { ACCENT_SUGGESTIONS, normalizeHex, useAccent, withLightness } from "../accent";
import { useT } from "../i18n";

const RAMP_LIGHTNESS = [0.88, 0.72, 0.56, 0.4, 0.26];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <Text
      className="tnum"
      fontSize="0.66rem"
      letterSpacing="0.14em"
      textTransform="uppercase"
      color="fg.muted"
      mb={3}
    >
      {children}
    </Text>
  );
}

// Requadre natiu de color (clicar-lo obre el selector del sistema) + camp hex.
function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (h: string) => void }) {
  const [draft, setDraft] = useState(value);

  // sincronitza el camp quan el color canvia des de fora (atzar inicial, swatch)
  useEffect(() => setDraft(value), [value]);

  const commitDraft = (v: string) => {
    setDraft(v);
    if (normalizeHex(v)) onChange(v);
  };

  return (
    <Box>
      <Label>{label}</Label>
      <HStack spacing={3}>
        <Box
          as="input"
          type="color"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          aria-label={label}
          w="46px"
          h="46px"
          p={0}
          borderRadius="6px"
          border="1px solid"
          borderColor="border.emphasized"
          bg="transparent"
          cursor="pointer"
          flexShrink={0}
          sx={{
            "&::-webkit-color-swatch-wrapper": { padding: "3px" },
            "&::-webkit-color-swatch": { border: "none", borderRadius: "4px" },
            "&::-moz-color-swatch": { border: "none", borderRadius: "4px" },
          }}
        />
        <Input
          value={draft}
          onChange={(e) => commitDraft(e.target.value)}
          maxW="9.5rem"
          h="46px"
          className="tnum"
          fontSize="16px"
          color="fg"
          bg="transparent"
          border="1px solid"
          borderColor="border.emphasized"
          borderRadius="6px"
          _hover={{ borderColor: "fg.muted" }}
          _focusVisible={{ borderColor: "accent.fg", boxShadow: "none" }}
          aria-label={label}
          spellCheck={false}
        />
      </HStack>
    </Box>
  );
}

export function ColorPicker() {
  const t = useT();
  const { hex, setHex, hex2, setHex2 } = useAccent();

  return (
    <Box>
      <Flex gap={{ base: 5, md: 8 }} mb={6} wrap="wrap">
        <ColorField label={t.picker.main} value={hex} onChange={setHex} />
        <ColorField label={t.picker.secondary} value={hex2} onChange={setHex2} />
      </Flex>

      <Label>{t.picker.suggestions}</Label>
      <HStack spacing={3} mb={6} flexWrap="wrap">
        {ACCENT_SUGGESTIONS.map((c) => {
          const selected = c.toLowerCase() === hex.toLowerCase();
          return (
            <Box
              key={c}
              as="button"
              type="button"
              onClick={() => setHex(c)}
              aria-label={`${t.picker.main}: ${c}`}
              aria-pressed={selected}
              w="34px"
              h="34px"
              borderRadius="full"
              bg={c}
              border="2px solid"
              borderColor={selected ? "fg" : "transparent"}
              outline="1px solid"
              outlineColor="border.emphasized"
              outlineOffset="2px"
              cursor="pointer"
              transition="transform 0.15s ease"
              _hover={{ transform: "scale(1.12)" }}
            />
          );
        })}
      </HStack>

      <Label>{t.picker.preview}</Label>
      <Flex borderRadius="8px" overflow="hidden" maxW="30rem" h="44px" border="1px solid" borderColor="border.emphasized">
        {RAMP_LIGHTNESS.map((l) => (
          <Box key={l} flex="1" bg={withLightness(hex, l)} />
        ))}
        {/* l'últim tram mostra el color secundari */}
        <Box flex="1" bg={hex2} />
      </Flex>
    </Box>
  );
}
