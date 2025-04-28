import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LiffProvider } from "@/contexts/LiffContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "卡片系統",
  description: "使用 LINE LIFF 的卡片編輯系統",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <LiffProvider>
          {children}
        </LiffProvider>
      </body>
    </html>
  );
}
