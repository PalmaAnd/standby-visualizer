import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Standby System Visualizer: Interactive High Availability Architecture Explorer',
  description: 'Explore and understand cold, warm, and hot standby configurations with our interactive visualization tool. Perfect for developers, architects, and students learning about high availability systems.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://palmaand.github.io/standby-visualizer/',
    title: 'Standby System Visualizer: Interactive High Availability Architecture Explorer',
    description: 'Explore and understand cold, warm, and hot standby configurations with our interactive visualization tool. Perfect for developers, architects, and students learning about high availability systems.',
    images: [
      {
        url: 'https://palmaand.github.io/standby-visualizer/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Standby System Visualizer: Interactive High Availability Architecture Explorer',
      },
    ],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
