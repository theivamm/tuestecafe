import type { Metadata, Viewport } from "next";
import { DM_Mono, DM_Sans, Young_Serif } from "next/font/google";
import { SITE } from "@/data/site";
import "./globals.css";

const serif = Young_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400", display: "swap" });
const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const mono = DM_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const viewport: Viewport = { themeColor: "#1d1d1d", colorScheme: "dark" };

export const metadata: Metadata = {
  metadataBase: new URL("https://tueste.cafe"),
  title: { default: `${SITE.name} — ${SITE.claim}`, template: `%s · ${SITE.name}` },
  description: `${SITE.claim} en ${SITE.neighborhood}. Menú completo: desayuno, tostones, sandwiches, pastelería, café de especialidad y más. ${SITE.address.street}, ${SITE.address.city}.`,
  keywords: ["café de especialidad", "Caballito", "Buenos Aires", "brunch Buenos Aires", "Doblas 690", "Tueste Café"],
  alternates: { canonical: "/" },
  icons: { icon: "/img/logo.png" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://tueste.cafe",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.claim}`,
    description: `${SITE.tagline}. ${SITE.hours.days} de ${SITE.hours.time}.`,
    images: [{ url: "/img/hero-02.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image", title: `${SITE.name} — ${SITE.claim}`, description: SITE.tagline, images: ["/img/hero-02.jpg"] },
  robots: { index: true, follow: true },
  category: "restaurant",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: SITE.name,
  slogan: SITE.tagline,
  image: "https://tueste.cafe/img/hero-02.jpg",
  priceRange: "$$",
  url: "https://tueste.cafe",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.province,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  hasMap: SITE.mapsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  sameAs: [SITE.instagramUrl],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
