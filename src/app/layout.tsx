import type { Metadata } from "next";

import "./globals.css";
import { inter } from "@/config/fonst";


export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop',
  },
  description: "una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
