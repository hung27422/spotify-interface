import { Session } from "inspector";
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
export interface ExtendedSession extends Session {
  accessToken: ExtendedToken["accessToken"];
  err: ExtendedToken["err"];
  user: ExtendedToken["user"];
  expires: string;
}
export interface NewRelease {
  body: [];
}
