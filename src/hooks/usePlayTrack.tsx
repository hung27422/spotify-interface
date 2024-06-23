import { ExtendedSession } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";

function usePlayTrack() {
  const { data: session } = useSession();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const playTrack = async (trackUri: string, offsetPosition: number = 0) => {
    try {
      const headers = {
        Authorization: "Bearer " + (session as ExtendedSession).accessToken,
      };

      const body = {
        uris: [trackUri],
        offset: {
          position: offsetPosition,
        },
        position_ms: 0,
      };

      await axios.put(`${apiUrl}me/player/play`, body, { headers });
    } catch (error: any) {
      console.error(
        "Error playing track:",
        error.response?.data || error.message
      );
    }
  };
  return { playTrack };
}

export default usePlayTrack;
