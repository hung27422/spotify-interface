"use client";
import useGetPlaylist from "@/hooks/useGetPlaylist";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import iconLogo from "@/assets/images/user.jpg";
import IconPlayPlaylist from "@/components/IconPlayPlaylist";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import Song from "@/components/Song";
function PlaylistDetail({ params }: { params: { idPlaylist: string } }) {
  const { data: session } = useSession();
  const { data: playlist } = useGetPlaylist({
    playlist_id: `${params.idPlaylist}`,
  });
  useEffect(() => {
    if (playlist) {
      console.log(playlist);
    }
  }, [playlist]);
  if (!playlist) return null;
  const songs = playlist.tracks.items;

  return (
    <>
      <div className="w-full overflow-y-scroll scrollbar-hidden">
        <header className="flex items-center bg-gradient-to-b from-red-500 to-page h-80 w-full padding-page">
          <div>
            <Image
              src={playlist?.images[0].url}
              alt="img-playlist"
              height={210}
              width={210}
              className="rounded-md"
            />
          </div>
          <div className="ml-4">
            <h1 className="text-7xl">{playlist.name}</h1>
            <div className="flex items-center mt-3">
              <Image
                src={session?.user?.image || iconLogo}
                alt="img-user"
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
              <span className="text-base font-bold mr-4">
                {playlist.owner.display_name}
              </span>
              <span>{playlist.tracks.items.length} Bài hát</span>
            </div>
          </div>
        </header>
        <section className="px-5">
          <div className="flex items-center">
            <IconPlayPlaylist />
            <EllipsisHorizontalIcon className="h-6 w-6 ml-4" />
          </div>
          <div>
            {songs.map((song, index) => {
              return <Song key={index} index={index} data={song} />;
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export default PlaylistDetail;
