import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "💕 Đếm Ngược Ngày Gặp Nhau",
  description: "Web app đếm ngược đến ngày hẹn hò - Dành cho các cặp đôi Gen Z 💖",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💕</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-love-gradient">{children}</body>
    </html>
  );
}
