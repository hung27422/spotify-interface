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

export interface Artists {
  id: string;
  name: string;
  type: string;
}
export interface Album {
  album_type: string;
  artist: Artists[];
  images: [
    {
      url: string;
    },
    {
      url: string;
    },
    {
      url: string;
    }
  ];
  name: string;
  release_date: string;
  type: string;
}
export interface Song {
  added_at: string;
  track: {
    idSong: string;
    name: string;
    type: string;
    artists: Artists[];
    album: Album;
    duration_ms: number;
  };
}
export interface PlaylistOfUser {
  id: string;
  name: string;
  owner: {
    display_name: string;
    id_owner: string;
  };
  images: [
    {
      url: string;
    }
  ];
}
export interface PlaylistDetails {
  id: PlaylistOfUser["id"];
  name: PlaylistOfUser["name"];
  owner: PlaylistOfUser["owner"];
  images: PlaylistOfUser["images"];
  tracks: {
    items: Song[];
  };
}
