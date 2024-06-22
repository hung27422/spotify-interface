"use client";
import useGetCurrentPlaylistOfUser from "@/hooks/useGetCurrentPlaylistOfUser";
import { PlaylistOfUser } from "@/types";
import Image from "next/image";
import Link from "next/link";

function PlaylistUserItem() {
  const { data: playlistUser } = useGetCurrentPlaylistOfUser();
  if (!playlistUser) return null;
  return (
    <>
      {playlistUser?.items.map((item: PlaylistOfUser, index: number) => {
        return (
          <Link
            href={`/pages/playlist/${item.id}`}
            key={index}
            className="flex p-2 w-full cursor-pointer"
          >
            <Image
              src={item?.images[0].url}
              alt="image-playlist"
              width={42}
              height={42}
              className="rounded-lg mr-3 w-auto h-auto"
            />
            <div>
              <span className="text-base font-semibold">{item.name}</span>
              <p className="text-sm font-light opacity-60">
                Danh sách phát: {item.owner.display_name}
              </p>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default PlaylistUserItem;
