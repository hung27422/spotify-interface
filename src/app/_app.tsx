"use client";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import React from "react";

function ProviderSession({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default ProviderSession;
