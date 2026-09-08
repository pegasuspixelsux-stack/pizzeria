import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--ff-display",
  display: "swap",
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--ff-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trattoria.example"),
  title: "Trattoria — Coastal restaurant & cocktail bar, Punta del Este",
  description:
    "A high-end coastal restaurant and cocktail bar on the Rambla in Punta del Este, Uruguay. Lunch on the terrace, dinner at golden hour, cocktails past midnight.",
  openGraph: {
    title: "Trattoria — Punta del Este",
    description:
      "One coastal room, seen through the three lights of a day. Reserve a table on the Rambla.",
    type: "website",
    locale: "en_UY",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-dvh bg-canvas font-sans text-ink">{children}</body>
    </html>
  );
}
