"use client";
import AlbumItem from "@/components/AlbumItem";
import { MusicContext } from "@/context/ContextMusic";
import useGetNewReleasesSpotify from "@/hooks/useGetNewReleasesSpotify";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { use, useContext, useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="">
      <AlbumItem />
    </main>
  );
}
