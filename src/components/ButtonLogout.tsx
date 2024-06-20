import { signOut } from "next-auth/react";

function ButtonLogout() {
  return (
    <button
      className="border-2 border-indigo-950 mt-3 py-1 px-2 rounded-lg hover:bg-[#030222] hover:text-white"
      onClick={() => {
        signOut();
      }}
    >
      Đăng xuất
    </button>
  );
}

export default ButtonLogout;
