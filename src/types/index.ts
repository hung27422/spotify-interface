import { Session } from "inspector";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Dispatch } from "react";

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
  uri: string;
}
export interface Song {
  added_at: string;
  track: {
    id: string;
    name: string;
    type: string;
    artists: Artists[];
    album: Album;
    duration_ms: number;
    uri: string;
  };
}
export interface SongCurrentOfUser {
  item: {
    id: string;
    name: string;
    type: string;
    artists: Artists[];
    album: Album;
    duration_ms: number;
    uri: string;
  };
  is_playing: boolean;
  context: {
    type: string;
    uri: string;
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
export interface Device {
  devices: [
    {
      id: string[];
      name: string;
      type: string;
      volume_percent: number;
    }
  ];
}
export interface SongContextState {
  selectedSongId?: string;
  selectedSong: SongCurrentOfUser | null;
  isPlaying: boolean;
  volume: number;
  deviceId: string | null;
}

export interface ISongContext {
  songContextState: SongContextState;
  dispatchSongAction: Dispatch<SongReducerAction>;
}

export enum SongReducerActionType {
  SetDevice = "SetDevice",
  ToggleIsPlaying = "ToggleIsPlaying",
  SetCurrentPlayingSong = "SetCurrentPlayingSong",
  SetVolume = "SetVolume",
}

export type SongReducerAction =
  | {
      type: SongReducerActionType.SetDevice;
      payload: Pick<SongContextState, "deviceId" | "volume">;
    }
  | {
      type: SongReducerActionType.ToggleIsPlaying;
      payload: boolean;
    }
  | {
      type: SongReducerActionType.SetCurrentPlayingSong;
      payload: Pick<
        SongContextState,
        "selectedSongId" | "selectedSong" | "isPlaying"
      >;
    }
  | {
      type: SongReducerActionType.SetVolume;
      payload: number;
    };
