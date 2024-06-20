import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import ProviderSession from "./_app";
import ContextMusic from "@/context/ContextMusic";
import Sidebar from "./layout/Sidebar";
import Player from "./layout/Player";
import Navbar from "./layout/Navbar";

const barlow = Barlow({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <ContextMusic>
        <ProviderSession>
          <body className={`${barlow.className} p-2 bg-black`}>
            <div className="grid grid-cols-4 height-sidebar gap-2 ">
              <Sidebar />
              <div className="flex flex-col flex-grow overflow-hidden col-span-3 bg-[#030222] rounded-xl">
                <Navbar />
                {children}
              </div>
            </div>
            <div className="bg-black">
              <Player />
            </div>
          </body>
        </ProviderSession>
      </ContextMusic>
    </html>
  );
}
