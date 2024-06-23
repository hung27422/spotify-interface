"use client";
import Song from "@/components/Song";
import useGetCurrentlyPlayingTrack from "@/hooks/useGetCurrentlyPlayingTrack";
import {
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  MicrophoneIcon,
  PlayIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/16/solid";
import { Micro_5 } from "next/font/google";
import Image from "next/image";
// Lấy trạng thái bài nhạc
function Player() {
  const { data: dataCurrentPlaying } = useGetCurrentlyPlayingTrack();
  if (!dataCurrentPlaying) return null;
  const images = dataCurrentPlaying?.item.album.images;
  const nameSong = dataCurrentPlaying?.item.name;
  const artists = dataCurrentPlaying?.item.artists;
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
          <BackwardIcon className="icon-player" />
          <PlayIcon className="icon-player" />
          <ForwardIcon className="icon-player" />
          <ArrowPathRoundedSquareIcon className="icon-player" />
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
