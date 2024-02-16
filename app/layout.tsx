import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import UpgradeProvider from "@/components/modal-provider";
import { CrispProvider } from "@/components/crisp-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neoten-ai",
  description: "Generate Image , videos, text, code by Neoten-ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <UpgradeProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
