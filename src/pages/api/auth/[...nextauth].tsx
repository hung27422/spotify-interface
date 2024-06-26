import { scopes, spotifyApi } from "@/config/spotify";
import { ExtendedToken, TokenErr } from "@/types";
import NextAuth, { CallbacksOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
interface CustomSession {
  user: {
    name: string;
    email: string;
  };
  accessToken?: string;
  err?: TokenErr;
}
const refreshAccessToken = async (
  token: ExtendedToken
): Promise<ExtendedToken> => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    //Spotify refresh token
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("REFRESH TOKEN ARE", refreshedToken);
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      refreshToken: refreshedToken.refresh_token || token.refreshToken,
      accessTokenExpiresAt: Date.now() + refreshedToken.expires_in * 1000,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      err: TokenErr.refreshTokenErr,
    };
  }
};
const sessionCallback: CallbacksOptions["session"] = async ({
  session,
  token,
}) => {
  const customSession = session as CustomSession;
  customSession.accessToken = (token as ExtendedToken).accessToken;
  customSession.err = (token as ExtendedToken).err;
  return session;
};
const jwtCallback: CallbacksOptions["jwt"] = async ({
  token,
  account,
  user,
}) => {
  let extendedToken: ExtendedToken;
  //Lần đầu tiên user login
  if (account && user) {
    extendedToken = {
      ...token,
      user,
      accessToken: account.access_token as string,
      refreshToken: account.refresh_token as string,
      accessTokenExpiresAt: (account.expires_at as number) * 1000, //convert to seconds
    };
    console.log("FIRST TIME LOGIN,EXTENDED TOKEN", extendedToken);

    return extendedToken;
  }
  //Trả lại token khi accessToken hết hạn trước 5s
  if (Date.now() + 5000 < (token as ExtendedToken).accessTokenExpiresAt) {
    console.log("ACCESS TOKEN STILL VALID, RETURNING EXTENDED TOKEN", token);
    return token;
  }
  //Access token hết hạn, refresh token
  console.log("ACCESS TOKEN EXPIRES, REFRESH...");
  return await refreshAccessToken(token as ExtendedToken);
};
//
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: scopes,
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
  },
};

export default NextAuth(authOptions);
