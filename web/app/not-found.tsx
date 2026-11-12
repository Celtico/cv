import { redirect } from "next/navigation";

// El lloc és una sola pàgina amb àncores: qualsevol altra ruta no té sentit,
// així que en comptes de mostrar un 404 tornem a l'inici.
export default function NotFound() {
  redirect("/");
}
