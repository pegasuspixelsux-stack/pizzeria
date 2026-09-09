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
  metadataBase: new URL("https://pizzeria.example"),
  title: "Pizzeria — Pizza napolitana al horno de leña, Punta del Este",
  description:
    "Una pizzería napolitana sobre la Rambla en Punta del Este, Uruguay. Masa de fermentación lenta, tomate San Marzano y horno a leña a 450 °C. Mediodía en la terraza, pizzas hasta tarde.",
  openGraph: {
    title: "Pizzeria — Punta del Este",
    description:
      "Pizza napolitana al horno de leña sobre la Rambla. Reservá una mesa.",
    type: "website",
    locale: "es_UY",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-dvh bg-canvas font-sans text-ink">{children}</body>
    </html>
  );
}
