"use client";
import { spotifyApi } from "@/config/spotify";
import useGetCurrentlyPlayingTrack from "@/hooks/useGetCurrentlyPlayingTrack";
import useSpotify from "@/hooks/useSpotify";
import { NewRelease, SongCurrentOfUser } from "@/types";
import { useSession } from "next-auth/react";
import React, {
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface Props {
  children: React.ReactNode;
}
interface MusicContextType {
  namePlaylist: string;
  setNamePlaylist: React.Dispatch<React.SetStateAction<string>>;
  colorHeadingPlaylist: string;
  setColorHeadingPlaylist: React.Dispatch<React.SetStateAction<string>>;
  idTrackContext: string;
  setIdTrackContext: React.Dispatch<React.SetStateAction<string>>;
  playerState: boolean;
  setPlayerState: React.Dispatch<React.SetStateAction<boolean>>;
  deviceId: string;
  setDeviceID: React.Dispatch<React.SetStateAction<string>>;
  currentSong: SongCurrentOfUser | undefined;
  setCurrentSong: React.Dispatch<
    React.SetStateAction<SongCurrentOfUser | undefined>
  >;
  idTrack: string;
  setIdTrack: React.Dispatch<React.SetStateAction<string>>;
}
const defaultValue: MusicContextType = {
  namePlaylist: "",
  setNamePlaylist: () => {},
  colorHeadingPlaylist: "",
  setColorHeadingPlaylist: () => {},
  idTrackContext: "",
  setIdTrackContext: () => {},
  playerState: true,
  setPlayerState: () => {},
  deviceId: "",
  setDeviceID: () => {},
  currentSong: undefined,
  setCurrentSong: () => {},
  idTrack: "",
  setIdTrack: () => {},
};
export const MusicContext = createContext<MusicContextType>(defaultValue);
function ContextMusic({ children }: Props) {
  //Lưu device_id để biết acction của user
  const { spotifyApi } = useSpotify();
  const { data: session } = useSession();

  useEffect(() => {
    const setCurrentDevice = async () => {
      const availableDevicesResponse = await spotifyApi.getMyDevices();
      if (!availableDevicesResponse.body.devices.length) return;
      const idDevice = availableDevicesResponse.body.devices[0].id;
      const { id: deviceId, volume_percent } =
        availableDevicesResponse.body.devices[0];
      setDeviceID(idDevice);
      await spotifyApi.transferMyPlayback([idDevice as string]);
    };
    if (spotifyApi.getAccessToken()) {
      setCurrentDevice();
    }
  }, [spotifyApi, session]);
  const [namePlaylist, setNamePlaylist] = useState<string>("");
  const [colorHeadingPlaylist, setColorHeadingPlaylist] = useState<string>("");
  const [idTrackContext, setIdTrackContext] = useState<string>("");
  const [playerState, setPlayerState] = useState<boolean>(true);
  const [deviceId, setDeviceID] = useState<string>("");
  const [currentSong, setCurrentSong] = useState<SongCurrentOfUser | undefined>(
    undefined
  );
  const [idTrack, setIdTrack] = useState<string>("");

  const contextValue = {
    namePlaylist,
    setNamePlaylist,
    colorHeadingPlaylist,
    setColorHeadingPlaylist,
    idTrackContext,
    setIdTrackContext,
    playerState,
    setPlayerState,
    deviceId,
    setDeviceID,
    currentSong,
    setCurrentSong,
    idTrack,
    setIdTrack,
  };

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
}

export default ContextMusic;
