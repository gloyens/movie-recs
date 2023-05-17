import "./globals.css";
import { fontClasses } from "./utils/fonts";
import { AppContextProvider } from "./utils/context";

export const metadata = {
  title: "MovieBot",
  description: "AI movie recommendations",
  keywords: ["AI", "GPT", "LLM", "Movies", "Films", "Recommendations"],
  twitter: {
    card: "summary_large_image",
    title: "MovieBot",
    description: "AI movie recommendations",
    creator: "@gloyens",
    images: ["og.png"],
  },
  openGraph: {
    url: "https://storyboard.design",
    images: [
      {
        url: "og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppContextProvider>
      <html lang="en">
        <body className={fontClasses}>{children}</body>
      </html>
    </AppContextProvider>
  );
}
