"use client";

import { signIn } from "next-auth/react";

interface LoginButtonProps {
  providerId: string;
  providerName: string;
}

const LoginButton = ({ providerId, providerName }: LoginButtonProps) => {
  return (
    <button
      className="bg-[#18d860] text-white p-5 rounded-full"
      onClick={() => {
        signIn(providerId, { callbackUrl: "/" });
      }}
    >
      Login With {providerName}
    </button>
  );
};

export default LoginButton;
