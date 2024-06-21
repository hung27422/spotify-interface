"use client";
import useGetNewReleasesSpotify from "@/hooks/useGetNewReleasesSpotify";
import useTest from "@/hooks/useTest";
import { useEffect } from "react";

function SearchPage() {
  const { data } = useTest();
  useEffect(() => {
    if (data) {
      console.log("albums", data);
    }
  }, [data]);
  return <div>PageSearch</div>;
}

export default SearchPage;
