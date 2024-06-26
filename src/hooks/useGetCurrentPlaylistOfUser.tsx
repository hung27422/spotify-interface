"use client";
import { useContext } from "react";
import useSWR from "swr";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { ExtendedSession } from "@/types";
//Lấy ra playlist của người dùng đang login
function useGetCurrentPlaylistOfUser() {
  const { data: session } = useSession();
  const fetcher = async (url: string) => {
    if (!session) throw new Error("No session available");

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + (session as ExtendedSession).accessToken,
        },
      });

      // Kiểm tra content-type của phản hồi
      if (response.headers["content-type"]?.includes("application/json")) {
        return response.data;
      } else {
        throw new Error(`Unexpected response: ${response.data}`);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
      throw error;
    }
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data, isLoading } = useSWR(apiUrl + `me/playlists`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, isLoading };
}

export default useGetCurrentPlaylistOfUser;
