import { spotifyApi } from "@/config/spotify";
import { useContext, useEffect, useState } from "react";
import useSpotify from "./useSpotify";
import { useSession } from "next-auth/react";
import { MusicContext } from "@/context/ContextMusic";

function useGetNewReleasesSpotify() {
  const { data: session } = useSession();
  const [contextValueNewReleases, setContextValueNewReleases] = useState();
  const spotifyApi = useSpotify();
  useEffect(() => {
    const getNewReleases = async () => {
      const getNewReleasesResponse = await spotifyApi.getNewReleases();
      setContextValueNewReleases(getNewReleasesResponse.body);
    };
    if (spotifyApi.getAccessToken()) {
      getNewReleases();
    }
  }, [session, spotifyApi]);
  return { contextValueNewReleases };
}

export default useGetNewReleasesSpotify;
