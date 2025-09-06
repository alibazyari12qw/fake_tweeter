import React from "react";
import LoginComponent from "@/app/_featurs/auth/LoginComponent";
import { Logo } from "@/app/_components/Logo";
import Title from "@/app/_components/Title";
const page = () => {
  return (
    <div className="flex flex-col gap-5 items-center h-[100vh] justify-center">
      <Logo />
      <Title className="mt-[-10px]">Login to yout account</Title>
      <LoginComponent />
    </div>
  );
};

export default page;
