// "use client";
// import { useContext } from "react";
// import useSWR from "swr";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { ExtendedSession } from "@/types";
// import useGetDevice from "./useGetDevice";

// function useTransferPlayback() {
//   const { data: session } = useSession();
//   const { data: dataDV } = useGetDevice();
//   const idDevice = dataDV?.devices.map((device) => device.id) || [];
//   const fetcher = (url: string) =>
//     axios
//       .get(url, {
//         headers: {
//           Authorization: "Bearer " + (session as ExtendedSession).accessToken,
//         },
//         params: {
//           device_id: [idDevice[0]],
//         },
//       })
//       .then((res) => res.data);
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const { data, isLoading } = useSWR(apiUrl + `me/player`, fetcher, {
//     revalidateIfStale: false,
//     revalidateOnFocus: false,
//     revalidateOnReconnect: false,
//   });
//   return { data, isLoading };
// }
// // https://api.spotify.com/v1/me/player
// export default useTransferPlayback;
