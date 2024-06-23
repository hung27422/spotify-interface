"use client";
import { useContext } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ExtendedSession, SongCurrentOfUser } from "@/types";

function useGetCurrentlyPlayingTrack() {
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
  const { data, isLoading, mutate } = useSWR<SongCurrentOfUser>(
    apiUrl + `me/player/currently-playing`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      // refreshInterval: 5000, //
    }
  );

  return { data, isLoading };
}

export default useGetCurrentlyPlayingTrack;
