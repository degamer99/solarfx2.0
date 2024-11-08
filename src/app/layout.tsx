import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solarfx",
  description: "Home to financial Investors",
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
        {/* Tidio script tag */}
        <script src="//code.tidio.co/kryrf6lki4rnjdqqopvqtinvjdqko7ms.js" async></script>
        </body>
    </html>
  );
}
