"use client";
import { useContext, useEffect, useState } from "react";
// import useSWR, { mutate } from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ExtendedSession, SongCurrentOfUser } from "@/types";
import useSWR from "swr";
import useSpotify from "./useSpotify";
import { MusicContext } from "@/context/ContextMusic";
function useGetCurrentlyPlayingTrack() {
  const { spotifyApi } = useSpotify();
  const { data: session } = useSession();
  const { idTrack } = useContext(MusicContext);

  const [currentSong, setCurrentSong] = useState<SongCurrentOfUser>();
  useEffect(() => {
    const getCurrentPlayingTrack = async () => {
      const songInfo = await spotifyApi.getMyCurrentPlayingTrack();
      if (!songInfo.body) return null;
      setCurrentSong(songInfo.body);
    };
    if (spotifyApi.getAccessToken()) {
      getCurrentPlayingTrack();
    }
  }, [spotifyApi, session, idTrack]);
  return { currentSong };
}

export default useGetCurrentlyPlayingTrack;
