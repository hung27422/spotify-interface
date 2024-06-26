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
    <main className="flex item-center justify-center text-center h-screen mt-[30vh] text-4xl px-5 ">
      Đây là dự án cá nhân. Sử dụng API Spotify nên bạn hãy đăng nhập bằng
      spotify, yêu cầu có playlist sẵn và mở web spotify lên chạy cùng vì đây là
      bản quyền api của Spotify.
    </main>
  );
}
