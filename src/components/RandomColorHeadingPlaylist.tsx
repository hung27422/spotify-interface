import { PlaylistDetails } from "@/types";
import { useEffect, useState } from "react";
interface Props {
  gradient: string;
  color: string;
}
interface RandomColorHeadingPlaylistProps {
  playlistId: string;
}
function RandomColorHeadingPlaylist({
  playlistId,
}: RandomColorHeadingPlaylistProps) {
  const [colorRandom, setColorRandom] = useState<Props>();
  const colorHeadings = [
    {
      gradient: "from-red-500",
      color: "bg-red-400",
    },
    {
      gradient: "from-green-500",
      color: "bg-green-400",
    },
    {
      gradient: "from-blue-500",
      color: "bg-blue-400",
    },
    {
      gradient: "from-pink-500",
      color: "bg-pink-400",
    },
    {
      gradient: "from-purple-500",
      color: "bg-purple-400",
    },
    {
      gradient: "from-yellow-500",
      color: "bg-yellow-400",
    },
  ];
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * colorHeadings.length);
    setColorRandom(colorHeadings[randomIndex]);
  }, [playlistId]);

  return { colorRandom };
}

export default RandomColorHeadingPlaylist;
