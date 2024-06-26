import { ClientSafeProvider, getProviders } from "next-auth/react";
import Image from "next/image";
import spotifyLogo from "@/assets/images/spotify-logo.png";
import LoginButton from "@/components/ButtonLogin";
interface Props {
  providers: Record<string, ClientSafeProvider>;
}

async function Login() {
  try {
    const providers = await getProviders();
    const { name, id } = providers?.spotify as ClientSafeProvider;

    if (!name || !id) {
      throw new Error("Spotify provider not found");
    }

    return (
      <div className="flex flex-col justify-center items-center bg-black h-screen">
        <Image src={spotifyLogo} alt="SpotifyLogo" height="200" width="200" />
        <LoginButton providerId={id} providerName={name} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching providers:", error);
    // Handle error display or fallback
    return (
      <div>An error occurred while fetching authentication providers.</div>
    );
  }
}

export default Login;
