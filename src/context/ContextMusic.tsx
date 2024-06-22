"use client";
import { NewRelease } from "@/types";
import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}
interface MusicContextType {
  namePlaylist: string;
  setNamePlaylist: React.Dispatch<React.SetStateAction<string>>;
  colorHeadingPlaylist: string;
  setColorHeadingPlaylist: React.Dispatch<React.SetStateAction<string>>;
}
const defaultValue: MusicContextType = {
  namePlaylist: "",
  setNamePlaylist: () => {},
  colorHeadingPlaylist: "",
  setColorHeadingPlaylist: () => {},
};
export const MusicContext = createContext<MusicContextType>(defaultValue);
function ContextMusic({ children }: Props) {
  const [namePlaylist, setNamePlaylist] = useState<string>("");
  const [colorHeadingPlaylist, setColorHeadingPlaylist] = useState<string>("");
  const contextValue = {
    namePlaylist,
    setNamePlaylist,
    colorHeadingPlaylist,
    setColorHeadingPlaylist,
  };

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
}

export default ContextMusic;
