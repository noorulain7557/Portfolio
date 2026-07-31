import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://noorulain.dev"),
  title: "Noor-ul-Ain Khalid — Creative Web Developer",
  description: "Creative web developer building expressive interfaces, reliable backend systems, and thoughtful digital experiences.",
  keywords: ["Noor-ul-Ain Khalid", "creative web developer", "React developer", "NestJS developer", "Pakistan"],
  authors: [{ name: "Noor-ul-Ain Khalid" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Noor-ul-Ain Khalid — Creative Web Developer",
    description: "Explore an immersive galaxy of web development, backend systems, and digital experiments.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Noor-ul-Ain Khalid — Creative Web Developer",
    description: "An immersive portfolio built across layers.",
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Noor-ul-Ain Khalid",
  jobTitle: "Creative Web Developer",
  address: { "@type": "PostalAddress", addressLocality: "Rawalpindi", addressCountry: "PK" },
  email: "mailto:noorulain5075@gmail.com",
  sameAs: ["https://www.linkedin.com/in/noor-khalid-a606aa354"],
  knowsAbout: ["React", "TypeScript", "NestJS", "PostgreSQL", "WebGL", "Cybersecurity"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
