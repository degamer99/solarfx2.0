import type { Metadata } from "next";
import "./globals.css";
import { Roboto, Merriweather, Inter } from '@next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto' });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-merriweather' });


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
    <html lang="en" className={`${roboto.variable} ${merriweather.variable}`}>
      <body className={inter.className}>
        {children}
        {/* Tidio script tag */}
        <script src="//code.tidio.co/kryrf6lki4rnjdqqopvqtinvjdqko7ms.js" async></script>
      </body>
    </html>
  );
}
