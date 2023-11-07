import Sidebar from "@/components/sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dorm Dollars",
  description: "Created by Team Byte Quantum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-slate-950")}>
        <Providers>
          <Sidebar />
          <main className="py-10 lg:pl-72 2xl:pl-0 h-screen">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
