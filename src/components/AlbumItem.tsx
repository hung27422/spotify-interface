import { PlayIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

function AlbumItem() {
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sapiente, nulla iusto incidunt similique ut distinctio a ipsam. Dicta perspiciatis inventore et consequuntur pariatur ipsam accusamus dolor exercitationem aperiam officia";
  return (
    <div className="h-64 w-fit p-2 rounded-lg overflow-hidden  hover:bg-primary cursor-pointer group">
      <div className="w-40 overflow-hidden">
        <div className="w-40 h-40 overflow-hidden relative ">
          <Image
            src={
              "https://i.scdn.co/image/ab67706f00000002a82e48387739c7169f4b7911"
            }
            alt="img-album"
            width={180}
            height={180}
            className="w-auto h-auto rounded-md"
          />
          <div className="absolute bottom-0 right-1 hidden group-hover:block animate-bounce">
            <div className="flex items-center justify-center w-14 h-14 bg-green-600 rounded-full ">
              <PlayIcon className="w-8 h-8 ml-1 text-black" />
            </div>
          </div>
        </div>
        <span className="block text-lg font-bold mt-2">Thiên hạ nghe gì</span>
        <p>{truncateText(text, 4)}</p>
      </div>
    </div>
  );
}

export default AlbumItem;
function truncateText(text: string, wordLimit: number) {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
}
