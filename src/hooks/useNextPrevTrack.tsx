// import { ExtendedSession } from "@/types";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { mutate } from "swr";
// import useGetDevice from "./useGetDevice";

// function useNextPrevTrack() {
//   const { data: session } = useSession();
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const { data: dataDV } = useGetDevice();
//   const idDevice = dataDV?.devices.map((device) => device.id) || [];
//   const handleNextPrevTrack = async (playerState: string) => {
//     try {
//       const headers = {
//         Authorization: "Bearer " + (session as ExtendedSession).accessToken,
//         "Content-Type": "application/json",
//       };
//       const body = {
//         device_id: idDevice[0],
//       };
//       await axios.post(`${apiUrl}me/player/${playerState}`, body, { headers });
//     } catch (error: any) {
//       console.error(
//         "Error playing track:",
//         error.response?.data || error.message
//       );
//     }
//   };
//   return { handleNextPrevTrack };
// }

// export default useNextPrevTrack;
