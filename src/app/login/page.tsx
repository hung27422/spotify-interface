import { ClientSafeProvider, getProviders } from "next-auth/react";
import Image from "next/image";
import spotifyLogo from "@/assets/images/spotify-logo.png";
import LoginButton from "@/components/ButtonLogin";
interface Props {
  providers: Record<string, ClientSafeProvider>;
}
// export async function getServerSideProps() {
//   const providers = await getProviders();

//   return {
//     props: {
//       providers,
//     },
//   };
// }
async function Login() {
  const providers = await getProviders();
  const { name, id } = providers?.spotify as ClientSafeProvider;

  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen">
      <Image src={spotifyLogo} alt="SpotifyLogo" height="200" width="200" />
      <LoginButton providerId={id} providerName={name} />
    </div>
  );
}

export default Login;
