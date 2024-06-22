"use client";
import IconPlayPlaylist from "@/components/IconPlayPlaylist";
import ProperInfoUser from "@/components/PopperInfoUser";
import { MusicContext } from "@/context/ContextMusic";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import { useContext } from "react";

function Navbar() {
  const { namePlaylist, colorHeadingPlaylist } = useContext(MusicContext);

  return (
    <div
      className={`flex items-center justify-between absolute top-0 left-0 right-0 h-16  ${colorHeadingPlaylist}`}
    >
      <div className="flex items-center">
        <div className="flex items-center">
          <ChevronLeftIcon className="w-8 h-8" />
          <ChevronRightIcon className="w-8 h-8" />
        </div>
        {namePlaylist && (
          <div className="flex items-center">
            <IconPlayPlaylist size="w-10 h-10" sizeIcon="w-6 h-6" />
            <span className="text-3xl ml-2">{namePlaylist}</span>
          </div>
        )}
      </div>
      <div className="flex items-center mr-2">
        <span className="bg-white text-black p-2 font-bold rounded-xl mx-2 cursor-pointer">
          Khám phá Premium
        </span>
        <span className="bg-gray-900 text-white p-2 font-bold rounded-xl mx-2 cursor-pointer">
          Cài đặt ưng dụng
        </span>
        <div>
          <ProperInfoUser />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
