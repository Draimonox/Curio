import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Curio",
  description: "Social media for curious minds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
