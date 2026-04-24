import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "pupa cerámicas",
  description: "Cerámica artesanal hecha a mano con amor. Piezas únicas y talleres en Barcelona.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-nunito">
          <Providers>{children}</Providers>
        </body>
    </html>
  );
}
