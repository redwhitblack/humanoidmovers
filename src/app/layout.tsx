import type { Metadata } from "next";
import { IBM_Plex_Mono, Outfit, Syne } from "next/font/google";
import { SiteFrame } from "@/components/SiteFrame";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["600", "700", "800"],
});

const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://humanoidmovers.com"),
  title: {
    default: "Humanoid Movers — The last moving company.",
    template: "%s · Humanoid Movers",
  },
  description:
    "The first commercial humanoid moving fleet. Atlas lifts, Finch packs, Hauler transits. White-glove relocation without the labor.",
  openGraph: {
    title: "Humanoid Movers — The last moving company.",
    description:
      "Humanoid robots that pack, lift, and relocate entire homes — millimetric care, industrial strength.",
    url: "https://humanoidmovers.com",
    siteName: "Humanoid Movers",
    type: "website",
    images: [{ url: "/media/hero-penthouse.jpg", width: 1200, height: 675 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humanoid Movers",
    description: "The last moving company.",
    images: ["/media/hero-penthouse.jpg"],
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${syne.variable} ${ibm.variable} antialiased`}>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
