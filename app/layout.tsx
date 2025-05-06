import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./components/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RetrieveX",
  description: "Find your lost items or post them here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
         <head>
            <title>RetrieveX</title>
            <script dangerouslySetInnerHTML={{
            __html: `
                try {
                    const theme = localStorage.getItem('theme');
                    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                        document.documentElement.classList.add('dark');
                    }
                } catch (e) {}
            `
        }}></script>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-teal-500 selection:text-white overflow-hidden`}
        >
            <ReactQueryProvider>
                {children}
            </ReactQueryProvider>
        </body>
    </html>
  );
}
