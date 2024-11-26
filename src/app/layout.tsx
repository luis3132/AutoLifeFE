import type { Metadata } from "next";
import "./globals.css";
import MainNavbar from "@/components/navbar/mainNavbar";

export const metadata: Metadata = {
  title: "AutoLife",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo/logoSLSF.png" />
      </head>
      <body className={` antialiased h-dvh relative`}>
        <MainNavbar />
        {children}
      </body>
    </html>
  );
}
