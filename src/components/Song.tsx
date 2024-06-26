"use client";
import { SongCurrentOfUser, Song as SongType } from "@/types";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { differenceInHours, differenceInDays } from "date-fns";
import { PauseIcon, PlayIcon } from "@heroicons/react/16/solid";
import useGetCurrentlyPlayingTrack from "@/hooks/useGetCurrentlyPlayingTrack";
import useSpotify from "@/hooks/useSpotify";
import { MusicContext } from "@/context/ContextMusic";
interface Props {
  data: SongType;
  index: number;
  player?: boolean;
}
function Song({ data, index, player }: Props) {
  const { currentSong } = useGetCurrentlyPlayingTrack();
  const { spotifyApi } = useSpotify();
  const { deviceId, playerState, setPlayerState, setIdTrack } =
    useContext(MusicContext);

  const handlePlayPause = (uri: string, uriAlbum: string) => {
    if (!deviceId) return null;
    if (data.track.id === currentSong?.item.id) {
      spotifyApi.pause();
      setPlayerState(true);
    } else {
      spotifyApi.play({
        device_id: deviceId,
        context_uri: uriAlbum,
        offset: {
          uri: uri as string,
        },
      });

      setPlayerState(false);
      setIdTrack(uri);
    }
  };
  if (!data) return null;
  if (!currentSong) return null;
  return (
    <div
      className={`grid grid-cols-5 h-14 items-center cursor-pointer rounded-md hover:bg-primary hover:text-white group`}
    >
      <div className="col-span-2 flex items-center">
        {data.track.id === currentSong?.item?.id && !playerState ? (
          <Image
            src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
            alt="icon-play"
            width={20}
            height={20}
            className="w-5 h-5 text-center hover-hidden"
          ></Image>
        ) : (
          <span className="w-5 text-center hover-hidden">{index + 1}</span>
        )}

        <div
          onClick={() => handlePlayPause(data.track.uri, data.track.album.uri)}
          className=" w-8 hidden hover-show "
        >
          {data.track.id === currentSong?.item.id && !playerState ? (
            <PauseIcon className="w-5 h-5 ml-auto mr-auto" />
          ) : (
            <PlayIcon className="w-5 h-5 ml-auto mr-auto" />
          )}
        </div>
        <Image
          src={data.track.album.images[2].url}
          alt="img-song"
          width={40}
          height={40}
          className="ml-3 rounded-md"
        />
        <div className="ml-4">
          <span
            className={`text-lg font-bold ${
              data.track.id === currentSong?.item.id &&
              "text-primary group-hover:text-white"
            }`}
          >
            {data.track.name}
          </span>
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
