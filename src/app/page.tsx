"use client";
import AlbumItem from "@/components/AlbumItem";
import { MusicContext } from "@/context/ContextMusic";
import useGetNewReleasesSpotify from "@/hooks/useGetNewReleasesSpotify";
import useSpotify from "@/hooks/useSpotify";
import useTest from "@/hooks/useTest";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { use, useContext, useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const { data: dataNRL } = useGetNewReleasesSpotify();
  useEffect(() => {
    if (dataNRL) {
      console.log("dataNRL", dataNRL);
    }
  }, [dataNRL]);

  return (
    <main className="mt-16">
      <AlbumItem />
    </main>
  );
}
