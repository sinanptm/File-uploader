import { Fira_Code } from 'next/font/google';
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Upload the data",
  description: "Generated by create next app",
};

const firaCode = Fira_Code({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
