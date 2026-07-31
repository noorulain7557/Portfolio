import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://noor-ul-ain-portfolio.danish-kumar26.chatgpt.site"),
  title: "Noor-ul-Ain Khalid — Creative Web Developer",
  description: "Creative web developer building expressive interfaces, reliable backend systems, and thoughtful digital experiences.",
  keywords: ["Noor-ul-Ain Khalid", "creative web developer", "React developer", "NestJS developer", "Python developer", "cybersecurity", "Pakistan"],
  authors: [{ name: "Noor-ul-Ain Khalid" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Noor-ul-Ain Khalid — Creative Web Developer",
    description: "Explore an immersive galaxy of web development, backend systems, and digital experiments.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1728, height: 960, alt: "NOOR.DEV — Creative Web Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noor-ul-Ain Khalid — Creative Web Developer",
    description: "An immersive portfolio built across layers.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon-32.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Noor-ul-Ain Khalid",
  jobTitle: "Creative Web Developer",
  address: { "@type": "PostalAddress", addressLocality: "Rawalpindi", addressCountry: "PK" },
  email: "mailto:noorulain5075@gmail.com",
  sameAs: ["https://www.linkedin.com/in/noor-khalid-a606aa354"],
  knowsAbout: ["React", "JavaScript", "TypeScript", "NestJS", "PostgreSQL", "Python", "WebGL", "Cybersecurity"],
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
