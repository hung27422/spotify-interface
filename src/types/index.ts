import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

export enum TokenErr {
  refreshTokenErr = "refreshTokenErr",
}
export interface ExtendedToken extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  user: User;
  err?: TokenErr;
}
