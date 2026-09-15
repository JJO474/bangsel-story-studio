import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "방셀 STORY STUDIO",
  description: "SOOP 스트리머용 4컷·6컷 스토리 방셀 제작 스튜디오",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
