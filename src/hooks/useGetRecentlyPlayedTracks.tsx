"use client";
import { useContext } from "react";
import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ExtendedSession } from "@/types";
//Lấy danh sách bài hát đã phát
function useGetRecentlyPlayedTracks() {
  const { data: session } = useSession();
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + (session as ExtendedSession).accessToken,
        },
      })
      .then((res) => res.data);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data, isLoading } = useSWR(
    apiUrl + `me/player/recently-played`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, isLoading };
}

export default useGetRecentlyPlayedTracks;
