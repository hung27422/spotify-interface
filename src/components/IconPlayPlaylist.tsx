import { PlayIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
interface Props {
  classes?: string;
  size?: string;
  sizeIcon?: string;
}
function IconPlayPlaylist({ classes, size, sizeIcon }: Props) {
  return (
    <div className={`animate-bounce ${classes}`}>
      <div
        className={`flex items-center justify-center bg-green-600 rounded-full ${size}`}
      >
        <PlayIcon className={`${sizeIcon} ml-1 text-black`} />
      </div>
    </div>
  );
}

export default IconPlayPlaylist;
