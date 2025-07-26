import { ThemeProvider } from "@/components/theme-provider"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/navbar/SidebarNavBar";
import { Toaster } from "@/components/ui/toaster";
import BottomNavBar from "@/components/navbar/BottomNavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Nearby",
  description: "Helps to find and connect with nearby people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-full flex-col dark:bg-black">
            <Sidebar />
            {children}
            <BottomNavBar/>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
