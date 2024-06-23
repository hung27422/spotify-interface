import { spotifyApi } from "@/config/spotify";
import { ExtendedSession, TokenErr } from "@/types";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

function useSpotify() {
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) return;
    //Nếu token có lỗi, thì redirect login
    if ((session as ExtendedSession).err === TokenErr.refreshTokenErr) {
      signIn();
    }
    spotifyApi.setAccessToken((session as ExtendedSession).accessToken);
  }, [session]);
  return { spotifyApi };
}

export default useSpotify;
