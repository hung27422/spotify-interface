"use client";
import { MusicContext } from "@/context/ContextMusic";
import useGetCurrentlyPlayingTrack from "@/hooks/useGetCurrentlyPlayingTrack";
import {
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import { mutate } from "swr";

import { useContext, useState } from "react";
import { url } from "inspector";
import useSpotify from "@/hooks/useSpotify";
import { SongCurrentOfUser, SongReducerActionType } from "@/types";
// Lấy trạng thái bài nhạc
function Player() {
  const { currentSong } = useGetCurrentlyPlayingTrack();
  const { spotifyApi } = useSpotify();
  const { playerState, setIdTrack, idTrack } = useContext(MusicContext);
  const [queue, setQueue] = useState<string[]>([]);
  if (!currentSong) return null;
  const images = currentSong?.item.album.images;
  const nameSong = currentSong?.item.name;
  const artists = currentSong?.item.artists;
  const handlePlayPauseTrackSong = async () => {
    const response = await spotifyApi.getMyCurrentPlayingTrack();
    if (!response.body) return null;
    if (response.body.is_playing) {
      await spotifyApi.pause();
    } else {
      await spotifyApi.play();
      setIdTrack(currentSong.item.id);
    }
  };
  const handleSkipPreviousTrack = async (type: string) => {
    if (type === "next") {
      await spotifyApi.skipToNext();
    } else if (type === "previous") {
      await spotifyApi.skipToPrevious();
    }
    const songInfo = await spotifyApi.getMyCurrentPlayingTrack();
    if (!songInfo.body) return null;
    setIdTrack(songInfo.body.item.id);
  };
  return (
    <div className="border-2 border-black h-[72px] grid grid-cols-4 items-center">
      <div className="col-span-1 flex items-center  ">
        <div>
          <Image
            src={images[2].url}
            width={56}
            height={56}
            alt="img-song"
            className="rounded-md"
          />
        </div>
        <div className="ml-4 ">
          <span className="text-base font-bold">{nameSong}</span>
          <div className="flex items-center">
            {artists.map((artist, index) => (
              <div key={index} className="flex items-center">
                <p className="mr-2 text-sm text-white font-normal">
                  {index === artists.length - 1
                    ? artist.name
                    : artist.name + ","}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col col-span-2 items-center">
        <div className="flex items-center justify-center">
          <ArrowsRightLeftIcon className="icon-player" />
          <BackwardIcon
            onClick={() => handleSkipPreviousTrack("previous")}
            className="icon-player"
          />
          {!currentSong.is_playing ? (
            <PlayIcon
              onClick={() => handlePlayPauseTrackSong()}
              className={`icon-player bg-primary hover:text-white`}
            />
          ) : (
            <PauseIcon
              onClick={() => handlePlayPauseTrackSong()}
              className="icon-player bg-primary hover:text-white"
            />
          )}

          <ForwardIcon
            onClick={() => handleSkipPreviousTrack("next")}
            className="icon-player"
          />
          <ArrowPathRoundedSquareIcon className="icon-player " />
        </div>
        <div>
          <input type="range" min={0} max={100} className="w-96" />
        </div>
      </div>
      <div className="col-span-1 items-center">
        <div className="flex items-center justify-end mr-4">
          <SpeakerWaveIcon className="h-7 w-7" />
          <input type="range" min={0} max={100} className="w-20 h-4" />
        </div>
      </div>
    </div>
  );
}

export default Player;
