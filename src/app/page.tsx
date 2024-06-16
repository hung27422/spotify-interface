"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  // console.log("session", session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session?.user && (
        <button
          onClick={() => {
            signOut();
          }}
        >
          LogOut
        </button>
      )}
      <h1 className="text-3xl font-bold underline">Hello world! 1</h1>
    </main>
  );
}
