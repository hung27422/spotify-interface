"use client";
import { useContext } from "react";
import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ExtendedSession } from "@/types";
interface UseTestParams {
  locale?: string;
  limit?: number;
  offset?: number;
}
// Lấy danh sách item ở search
//Cách sử dụng  const { data } = useTest({ locale: "sv_SE", limit: 10, offset: 5 });
function useGetSeveralBrowseCategories({
  locale,
  limit,
  offset,
}: UseTestParams) {
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
  const { data, isLoading } = useSWR(
    apiUrl + `browse/categories${queryParams.toString()}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, isLoading };
}

export default useGetSeveralBrowseCategories;
