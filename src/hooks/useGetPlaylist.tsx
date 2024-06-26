"use client";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ExtendedSession, PlaylistDetails } from "@/types";
import useSpotify from "./useSpotify";
interface UseTestParams {
  playlist_id: string;
}
function useGetPlaylist({ playlist_id }: UseTestParams) {
  const { spotifyApi } = useSpotify();
  const { data: session } = useSession();
  const [playlist, setPlaylist] = useState<PlaylistDetails>();
  useEffect(() => {
    const getPlaylistUser = async () => {
      const playlistInfo = await spotifyApi.getPlaylist(playlist_id);
      if (!playlistInfo.body) return null;
      setPlaylist(playlistInfo.body);
    };
    if (spotifyApi.getAccessToken()) {
      getPlaylistUser();
    }
  }, [spotifyApi, session, playlist_id]);
  return { playlist };
}

export default useGetPlaylist;
