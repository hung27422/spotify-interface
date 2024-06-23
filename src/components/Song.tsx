"use client";
import { Song as SongType } from "@/types";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { differenceInHours, differenceInDays } from "date-fns";
import { PlayIcon } from "@heroicons/react/16/solid";
import { MusicContext } from "@/context/ContextMusic";
import useGetTrack from "@/hooks/useGetTrack";
import useGetPlaybackState from "@/hooks/useGetPlaybackState";
import useGetCurrentPlaylistOfUser from "@/hooks/useGetCurrentPlaylistOfUser";
import useGetCurrentlyPlayingTrack from "@/hooks/useGetCurrentlyPlayingTrack";
import useSpotify from "@/hooks/useSpotify";
import usePlayTrack from "@/hooks/usePlayTrack";
interface Props {
  data: SongType;
  index: number;
  player?: boolean;
}
function Song({ data, index, player }: Props) {
  const { setIdTrackContext } = useContext(MusicContext);
  // const { data: dataTrack } = useGetTrack();
  const { data: dataPlayback } = useGetPlaybackState();
  const { data: dataCurrentPlaying } = useGetCurrentlyPlayingTrack();
  const { spotifyApi } = useSpotify();
  const { playTrack } = usePlayTrack();

  // useEffect(() => {
  //   if (dataCurrentPlaying) {
  //     console.log("dataCurrentPlaying", dataCurrentPlaying);
  //   }
  // }, [dataCurrentPlaying]);
  const handlePlayPause = async () => {
    playTrack("spotify:track:5U30iZBlmxkpHqzb1OSnBS");
  };
  if (!data) return null;
  return (
    <div className="grid grid-cols-5 h-14 items-center cursor-pointer rounded-md hover:bg-primary hover:text-white group">
      <div className="col-span-2 flex items-center">
        <span className="w-8 text-center hover-hidden">{index + 1}</span>
        <div
          onClick={() => handlePlayPause()}
          className=" w-8 hidden hover-show "
        >
          <PlayIcon className="w-5 h-5 ml-auto mr-auto" />
        </div>
        <Image
          src={data.track.album.images[2].url}
          alt="img-song"
          width={40}
          height={40}
          className="ml-3 rounded-md"
        />
        <div className="ml-4">
          <span className="text-lg font-bold">{data.track.name}</span>
          <div className="flex items-center">
            {data.track.artists.map((artist, index) => (
              <div key={index} className="flex items-center">
                <p className="mr-2 text-sm text-white font-normal">
                  {index === data.track.artists.length - 1
                    ? artist.name
                    : artist.name + ","}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`col-span-1 ${player && "hidden"}`}>
        <span className="text-gray-300">{data.track.album.name}</span>
      </div>
      <div
        className={`col-span-1 text-center text-gray-300 ${player && "hidden"}`}
      >
        {formatTimeAgo(new Date(data.added_at))}
      </div>
      <div
        className={`col-span-1 text-center text-gray-300 ${player && "hidden"}`}
      >
        <span>{formatMilliseconds(data.track.duration_ms)}</span>
      </div>
    </div>
  );
}

export default Song;
function formatTimeAgo(dateTime: Date): string {
  const now = new Date();
  const hoursAgo = differenceInHours(now, dateTime);
  const daysAgo = differenceInDays(now, dateTime);
  if (hoursAgo < 24) {
    return `${hoursAgo} giờ trước`;
  } else {
    return `${daysAgo} ngày trước`;
  }
}
function formatMilliseconds(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}
