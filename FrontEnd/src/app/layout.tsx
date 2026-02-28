import "./globals.css";
import Hero from "@/components/hero/hero";
import Navbar from "@/components/layouts/navbar";
import { Schibsted_Grotesk } from "next/font/google";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-schibsted",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${schibstedGrotesk.variable}`}>
      <body className={`min-h-screen flex flex-col scroll-smooth`}>
        <header className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </header>

        <main className="flex grow">{children}</main>
      </body>
    </html>
  );
}
