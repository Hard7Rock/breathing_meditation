import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Breathing Meditation",
  description: "5 основних патернів дихання для медитацій",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className="antialiased">{children}</body>
    </html>
  );
}
