import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReduxProvider } from "./features/ReduxProvider";
import UserLoader from "./components/userLoader";
import type { ReactNode } from "react";

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
  title: "Investe Home",
  description: "Negocios Imobiliarios",
};

export default function RootLayout({
  children,
}: {children: ReactNode}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ReduxProvider>
          {/* <Header/> */}
          <UserLoader/>
            {children}
          {/* <Footer/> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
