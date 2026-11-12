import type { CSSProperties } from "react";
import { RichText } from "@serverscel/ds";

const paragraf: CSSProperties = {
  color: "var(--chakra-colors-fg-muted)",
  font: "400 1.25rem/1.7 system-ui, -apple-system, 'Segoe UI', sans-serif",
  maxWidth: "38rem",
  margin: 0,
};

/**
 * El cas per al qual està fet: UNA frase ressaltada dins d'un paràgraf apagat.
 * El que la fa funcionar és el contrast amb el text del voltant.
 */
export function UnaFraseRessaltada() {
  return (
    <p style={paragraf}>
      <RichText>
        Aquest paràgraf va amb el to apagat de sempre, i enmig hi ha ==una frase pintada amb el
        degradat per dins de les lletres==, que és on vols que se'n vagi la mirada.
      </RichText>
    </p>
  );
}

/** La negreta no canvia el color: pes 600 i el to que ja tingués el text. */
export function Negreta() {
  return (
    <p style={paragraf}>
      <RichText>
        El marcatge viu al text traduïble i no al JSX, de manera que **la mateixa frase en tres
        llengües** duu el ressaltat al lloc que li toca a cadascuna.
      </RichText>
    </p>
  );
}

/** Els dos marcadors alhora, que és com surt a la portada. */
export function ElsDosAlhora() {
  return (
    <p style={paragraf}>
      <RichText>
        ==Un titular d'entradeta== amb **una xifra destacada** al mig i la resta del paràgraf en to
        apagat, perquè el ressaltat només ressalta si el que l'envolta calla.
      </RichText>
    </p>
  );
}
