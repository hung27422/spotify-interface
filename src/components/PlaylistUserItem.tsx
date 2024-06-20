import Image from "next/image";

function PlaylistUserItem() {
  return (
    <div className="flex p-2 w-full">
      <Image
        src={"https://i.scdn.co/image/ab67706f00000002f4a2411f75e787dd6fa887b1"}
        alt="image-playlist"
        width={48}
        height={48}
        className="rounded-lg mr-3"
      />
      <div>
        <span className="text-base font-semibold">Chill #1</span>
        <p className="text-sm font-light opacity-60">
          Danh sách phát: Hồ Tấn Hùng
        </p>
      </div>
    </div>
  );
}

export default PlaylistUserItem;
