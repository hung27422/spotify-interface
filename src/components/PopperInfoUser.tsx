import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Image from "next/image";
import { useSession } from "next-auth/react";
import userIcon from "@/assets/images/user.jpg";
import ButtonLogout from "./ButtonLogout";
export default function ProperInfoUser() {
  const { data: session } = useSession();

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Image
            src={session?.user?.image || userIcon}
            width={40}
            height={40}
            alt="avt-user"
            className="rounded-full border-2 border-primary cursor-pointer"
            {...bindTrigger(popupState)}
          ></Image>

          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            className="mt-2"
          >
            <Typography sx={{ p: 2, width: 150, textAlign: "center" }}>
              <span className="text-black font-semibold border-1 border-b border-gray-400 pb-2 w-36">
                {session?.user?.name}
              </span>
              <ButtonLogout />
            </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
