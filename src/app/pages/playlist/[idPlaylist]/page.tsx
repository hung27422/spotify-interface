"use client";
import useGetPlaylist from "@/hooks/useGetPlaylist";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import iconLogo from "@/assets/images/user.jpg";
import IconPlayPlaylist from "@/components/IconPlayPlaylist";
import { ClockIcon, EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import Song from "@/components/Song";
import { MusicContext } from "@/context/ContextMusic";
import RandomColorHeadingPlaylist from "@/components/RandomColorHeadingPlaylist";
function PlaylistDetail({ params }: { params: { idPlaylist: string } }) {
  const { data: session } = useSession();
  const { data: playlist } = useGetPlaylist({
    playlist_id: `${params.idPlaylist}`,
  });
  const { setNamePlaylist, setColorHeadingPlaylist } = useContext(MusicContext);

  const [hide, setHide] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { colorRandom } = RandomColorHeadingPlaylist({
    playlistId: `${playlist?.id}`,
  });

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      if (scrollTop >= 280) {
        if (playlist && colorRandom) {
          setNamePlaylist(playlist?.name);
          setHide(false);
          setColorHeadingPlaylist(colorRandom?.color);
        }
      } else {
        setHide(true);
        setNamePlaylist("");
        setColorHeadingPlaylist("");
      }
    }
  }, [colorRandom, playlist, setColorHeadingPlaylist, setNamePlaylist]);
  //Khi cuộn scroll sẽ thực hiện handleScroll để lấy vị trí scrollTop
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);
  //Sau khi chuyển trang set tất cả về ban đầu
  useEffect(() => {
    setHide(true);
    setNamePlaylist("");
    setColorHeadingPlaylist("");
  }, [params.idPlaylist, setColorHeadingPlaylist, setNamePlaylist]);
  if (!playlist) return null;
  const songs = playlist.tracks.items;
  return (
    <>
      <div
        ref={containerRef}
        className="w-full overflow-y-scroll scrollbar-hidden"
      >
        <div
          className={`flex items-center bg-gradient-to-b ${colorRandom?.gradient} to-page h-80 w-full padding-page`}
        >
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
        </div>
        <section className="px-5">
          {hide && (
            <div className="flex items-center">
              <IconPlayPlaylist size="w-10 h-10" sizeIcon="w-6 h-6" />
              <EllipsisHorizontalIcon className="h-6 w-6 ml-4" />
            </div>
          )}
          <div>
            <div
              className={`grid grid-cols-5 h-14 items-center border-b border-gray-700 select-none mb-2 ${
                !hide && "absolute right-5 top-16 left-5 bg-page"
              }`}
            >
              <div className=" flex col-span-2">
                <span className="w-8 text-center">#</span>
                <span className="ml-3">Tiêu đề</span>
              </div>
              <span className="col-span-1">Album</span>
              <span className="col-span-1 text-center">Ngày & Giờ thêm</span>
              <span className="col-span-1 text-center">
                <ClockIcon className="w-5 h-5 text-center ml-auto mr-auto" />
              </span>
            </div>
            <div className={`${!hide && "mt-28"}`}>
              {songs.map((song, index) => {
                return <Song key={index} index={index} data={song} />;
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default PlaylistDetail;
