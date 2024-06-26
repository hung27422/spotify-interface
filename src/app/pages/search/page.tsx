"use client";
import { MusicContext } from "@/context/ContextMusic";
import useGetCurrentlyPlayingTrack from "@/hooks/useGetCurrentlyPlayingTrack";
import useTest from "@/hooks/useTest";
import { useContext, useEffect, useMemo } from "react";

function SearchPage() {
  const { data } = useTest();
  const { currentSong } = useGetCurrentlyPlayingTrack();
  const { deviceId, setDeviceID } = useContext(MusicContext);
  useEffect(() => {
    if (currentSong) {
      console.log("currentSong", currentSong);
    }
    if (deviceId) {
      console.log("deviceId", deviceId);
    }
  }, [currentSong, deviceId]);
  return <div>PageSearch</div>;
}

export default SearchPage;
