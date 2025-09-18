import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TransBook - AI Book Translation | Preserve Style & Meaning",
  description: "Transform any book into 100+ languages with AI that preserves style, context, and meaning. Professional translation quality in minutes. Try free - no registration required.",
  keywords: [
    "book translation",
    "AI translation",
    "literary translation",
    "book translator",
    "AI book translation",
    "translate books online",
    "multilingual books",
    "professional translation",
    "preserve formatting",
    "context-aware translation"
  ],
  authors: [{ name: "TransBook Team" }],
  creator: "TransBook",
  publisher: "TransBook",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://transbook.com",
    siteName: "TransBook",
    title: "TransBook - AI Book Translation | Preserve Style & Meaning",
    description: "Transform any book into 100+ languages with AI that preserves style, context, and meaning. Professional translation quality in minutes.",
    images: [
      {
        url: "/logo.png", // Use public path instead of import
        width: 1200,
        height: 630,
        alt: "TransBook - AI-Powered Book Translation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@TransBook",
    creator: "@TransBook",
    title: "TransBook - AI Book Translation",
    description: "Transform any book into 100+ languages with AI. Professional quality in minutes.",
    images: ["/logo.png"], // Use the same logo or create a twitter-specific one
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://transbook.com",
  },
  category: "Technology",
  // Add favicon and other icon links
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/logo.png",
      },
      {
        rel: "icon",
        type: "image/png", 
        sizes: "16x16",
        url: "/logo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional SEO meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4f46e5" />
        <link rel="canonical" href="https://transbook.com" />
        
        {/* Favicon links - Next.js will automatically handle these if you have the files */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "TransBook",
              "description": "AI-powered book translation service that preserves style, context, and meaning while translating books into 100+ languages.",
              "url": "https://transbook.com",
              "logo": "https://transbook.com/logo.png",
              "image": "https://transbook.com/logo.png",
              "applicationCategory": "TranslationApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "category": "Translation Services",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "500",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
     
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-LVW8X3X5DG"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LVW8X3X5DG');  // <- HERE
        `}
      </Script>

        {children}
      </body>
    </html>
  );
}