import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../state/AppContext";


export const metadata: Metadata = {
  title: "gensosanso portfolio",
  description: "a portfolio website for Han (GensoSanso)",
  icons: {
    icon: "/favicon.png",
  },
};

const IBM_PLEX_MONO = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${IBM_PLEX_MONO.variable} font-sans`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
