import type { Metadata } from "next";
import { Header, Footer } from "@/components/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Bethany UGC | Real life. Thoughtful content.", template: "%s | Bethany UGC" },
  description: "Meet Beth, an Essex-based UGC creator and marketing expert. Relatable motherhood, lifestyle and wellness content for brands, backed by 10+ years in marketing.",
  openGraph: { title: "Bethany UGC — Content with a little more life.", description: "Motherhood & lifestyle creator. Marketing mind. Real-life storytelling.", type: "website", locale: "en_GB" },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en-GB"><body><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main">{children}</main><Footer/></body></html>;
}
