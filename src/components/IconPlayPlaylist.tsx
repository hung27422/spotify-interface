import { PlayIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
interface Props {
  classes?: string;
}
function IconPlayPlaylist({ classes }: Props) {
  return (
    <div className={`animate-bounce ${classes}`}>
      <div className="flex items-center justify-center w-14 h-14 bg-green-600 rounded-full ">
        <PlayIcon className="w-8 h-8 ml-1 text-black" />
      </div>
    </div>
  );
}

export default IconPlayPlaylist;
