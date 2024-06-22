"use client";
import ProperInfoUser from "@/components/PopperInfoUser";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/16/solid";

function Navbar() {
  return (
    <div className="flex items-center absolute top-0 left-0 right-[12px] justify-between h-16 ">
      <div className="flex items-center ">
        <ChevronLeftIcon className="w-8 h-8" />
        <ChevronRightIcon className="w-8 h-8" />
      </div>
      <div className="flex items-center">
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
