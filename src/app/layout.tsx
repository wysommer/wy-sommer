import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Grape_Nuts } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const grapeNuts = Grape_Nuts({
  variable: "--font-grape-nuts",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wÿ Sommer Portfolio",
  description: "Personal portfolio website for Wÿ Sommer, showcasing web design and development projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${grapeNuts.variable}`}>
      <body className="text-black dark:text-white min-h-screen relative">
        <ThemeProvider>
          {/* Navigation - four corners with minimal styling */}
          <nav className="fixed w-full h-full pointer-events-none z-50">
            {/* Theme Toggle Button */}
            <ThemeToggle />
            
            {/* Top Left - Home */}
            <Link href="/" className="absolute top-8 left-8 pointer-events-auto hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <div className="font-grape-nuts text-xl">
                home
              </div>
            </Link>
            
            {/* Job Board - Top Right (left of portfolio) */}
            <Link href="/job-board" className="absolute top-8 right-36 pointer-events-auto hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <div className="font-grape-nuts text-xl">
                job offers
              </div>
            </Link>
            
            {/* Top Right - Portfolio */}
            <Link href="/portfolio" className="absolute top-8 right-8 pointer-events-auto hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <div className="font-grape-nuts text-xl">
                portfolio
              </div>
            </Link>
            
            {/* Bottom Left - Resume */}
            <Link href="/resume" className="absolute bottom-8 left-8 pointer-events-auto hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <div className="font-grape-nuts text-xl">
                resume
              </div>
            </Link>
            
            {/* Bottom Right - Contact */}
            <Link href="/contact" className="absolute bottom-8 right-8 pointer-events-auto hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <div className="font-grape-nuts text-xl">
                contact
              </div>
            </Link>
          </nav>
          
          <main className="h-full w-full">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
