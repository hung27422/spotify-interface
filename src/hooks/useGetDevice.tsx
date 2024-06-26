// "use client";
// import { useContext, useEffect } from "react";
// import useSWR, { mutate } from "swr";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { Device, ExtendedSession } from "@/types";

// function useGetDevice() {
//   const { data: session } = useSession();
//   const fetcher = (url: string) =>
//     axios
//       .get(url, {
//         headers: {
//           Authorization: "Bearer " + (session as ExtendedSession).accessToken,
//         },
//       })
//       .then((res) => res.data);
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const { data, isLoading, mutate } = useSWR<Device>(
//     apiUrl + `me/player/devices`,
//     fetcher
//   );
//   useEffect(() => {
//     if (data) {
//       mutate();
//     }
//   }, [data, mutate]);
//   return { data, isLoading };
// }

// export default useGetDevice;
