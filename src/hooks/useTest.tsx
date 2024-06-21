"use client";
import { useContext } from "react";
import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ExtendedSession } from "@/types";
interface UseTestParams {
  type: string;
  time_range?: string;
  limit?: number;
  offset?: number;
}
function useTest() {
  const { data: session } = useSession();
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + (session as ExtendedSession).accessToken,
        },
      })
      .then((res) => res.data);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const queryParams = new URLSearchParams();
  const { data, isLoading } = useSWR(apiUrl + `albums`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, isLoading };
}

export default useTest;
