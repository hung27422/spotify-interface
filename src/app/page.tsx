"use client";
import { MusicContext } from "@/context/ContextMusic";
import useGetNewReleasesSpotify from "@/hooks/useGetNewReleasesSpotify";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { use, useContext, useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  // console.log("session", session);
  // const { contextValueNewReleases, setContextValueNewReleases } =
  //   useContext(MusicContext);
  // const { contextValueNewReleases } = useGetNewReleasesSpotify();
  // useEffect(() => {
  //   if (contextValueNewReleases) {
  //     console.log(contextValueNewReleases);
  //   }
  // }, [contextValueNewReleases, session]);
  // console.log("contextValueNewReleases", contextValueNewReleases);

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
