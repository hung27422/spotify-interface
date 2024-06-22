"use client";
import { Song as SongType } from "@/types";
import Image from "next/image";
import { useEffect } from "react";
import { differenceInHours, differenceInDays } from "date-fns";
interface Props {
  data: SongType;
  index: number;
}
function Song({ data, index }: Props) {
  useEffect(() => {
    if (data) {
      console.log("songs", data);
    }
  }, [data]);
  return (
    <div className="grid grid-cols-5 h-14 items-center">
      <div className="col-span-2 flex items-center">
        <span className="w-8 text-center">{index + 1}</span>
        <Image
          src={data.track.album.images[2].url}
          alt="img-song"
          width={40}
          height={40}
          className="ml-3 rounded-md"
        />
        <div className="ml-4">
          <span className="text-lg">{data.track.name}</span>
          <div className="flex items-center">
            {data.track.artists.map((artist, index) => (
              <div key={index} className="flex items-center">
                <p className="mr-2 text-sm text-gray-400">
                  {index === data.track.artists.length - 1
                    ? artist.name
                    : artist.name + ","}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <span className="text-gray-300">{data.track.album.name}</span>
      </div>
      <div className="col-span-1 text-center text-gray-300">
        {formatTimeAgo(new Date(data.added_at))}
      </div>
      <div className="col-span-1 text-center text-gray-300">
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
    return `Thêm ${hoursAgo} giờ trước`;
  } else {
    return `Thêm ${daysAgo} ngày trước`;
  }
}
function formatMilliseconds(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}
