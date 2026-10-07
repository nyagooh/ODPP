import type { Metadata, Viewport } from "next";
import { Geist, Libre_Caslon_Display, Source_Serif_4 } from "next/font/google";
import "@/styles/base.css";
import "@/styles/system.css";
import "@/styles/public.css";
import "@/styles/app.css";
import "@/styles/inner.css";
import "@/styles/workspace.css";
import "@/styles/type.css";
import "@/styles/chat.css";
import "@/styles/search.css";

// Display headlines: Caslon, the face of legal and constitutional printing.
const display = Libre_Caslon_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

// Document text and quotations: built for long reading.
const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
});

// Interface.
const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ODPP Prosecution Research",
  description:
    "Design concept: search and ask across ODPP publications and the Constitution of Kenya, with every answer cited to the original page.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-KE" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
