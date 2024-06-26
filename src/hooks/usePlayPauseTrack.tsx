// import { ExtendedSession } from "@/types";
// import axios from "axios";
// import { useSession } from "next-auth/react";

// function usePlayPauseTrack() {
//   const { data: session } = useSession();
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const { data: dataDV } = useGetDevice();

//   const handlePlayPauseTrack = async (
//     trackUri: string,
//     offsetPosition: number = 0,
//     playerState: string,
//     context_uri: string
//   ) => {
//     try {
//       const headers = {
//         Authorization: "Bearer " + (session as ExtendedSession).accessToken,
//       };

//       const body = {
//         // uris: [trackUri],
//         context_uri: context_uri,
//         offset: {
//           uri: trackUri,
//         },
//         position_ms: 0,
//         device_id: idDevice[0],
//       };

//       await axios.put(`${apiUrl}me/player/${playerState}`, body, { headers });
//     } catch (error: any) {
//       console.error(
//         "Error playing track:",
//         error.response?.data || error.message
//       );
//     }
//   };
//   return { handlePlayPauseTrack };
// }

// export default usePlayPauseTrack;
