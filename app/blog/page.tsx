import { BlogIndexShell, blogIndexMetadata } from "./shell";

export const metadata = blogIndexMetadata("ca");

export default function BlogPage() {
  return <BlogIndexShell lang="ca" />;
}
