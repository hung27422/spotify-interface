"use client";
import { NewRelease } from "@/types";
import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}
interface MusicContextType {
  contextValueNewReleases: NewRelease[];
  setContextValueNewReleases: React.Dispatch<React.SetStateAction<any[]>>;
}
const defaultValue: MusicContextType = {
  contextValueNewReleases: [],
  setContextValueNewReleases: () => {},
};
export const MusicContext = createContext<MusicContextType>(defaultValue);
function ContextMusic({ children }: Props) {
  const [contextValueNewReleases, setContextValueNewReleases] = useState<any>(
    []
  );
  const contextValue = { contextValueNewReleases, setContextValueNewReleases };
  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
}

export default ContextMusic;
