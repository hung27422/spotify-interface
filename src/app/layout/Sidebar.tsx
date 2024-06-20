import IconButton from "@/components/IconButton";
import PlaylistUserItem from "@/components/PlaylistUserItem";
import {
  HomeIcon,
  MagnifyingGlassCircleIcon,
  BuildingLibraryIcon,
  PlusIcon,
  ArrowRightIcon,
} from "@heroicons/react/16/solid";

function Sidebar() {
  return (
    <div className="col-span-1 h-screen height-sidebar overflow-hidden">
      <div className="flex flex-col items-start  py-2 px-4 bg-sidebar text-white rounded-xl --panel-gap">
        <IconButton icon={HomeIcon} title="Trang chủ" />
        <IconButton icon={MagnifyingGlassCircleIcon} title="Tìm kiếm" />
      </div>
      <div className="flex flex-col items-start  py-2 px-4 bg-sidebar text-white rounded-xl height-sidebar-item">
        <header className="flex items-center justify-between w-full">
          <IconButton icon={BuildingLibraryIcon} title="Thư viện" />
          <div className="flex items-center justify-center">
            <div className="p-1 mx-1 cursor-pointer rounded-full hover:bg-indigo-300">
              <PlusIcon className="w-6 h-6" />
            </div>
            <div className="p-1 mx-1 cursor-pointer rounded-full hover:bg-indigo-300">
              <ArrowRightIcon className="w-6 h-6" />
            </div>
          </div>
        </header>
        <section className="w-full">
          <PlaylistUserItem />
        </section>
      </div>
    </div>
  );
}

export default Sidebar;
