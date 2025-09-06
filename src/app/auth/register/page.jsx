import React from "react";
import RegiesterComponent from "@/app/_featurs/auth/RegiesterComponent";
import { Logo } from "@/app/_components/Logo";
import Title from "@/app/_components/Title";
const page = () => {
  return (
    <div className="flex flex-col gap-5 items-center h-[100vh] justify-center">
      <Logo />
      <Title className="mt-[-10px]">Create your new account</Title>
      <RegiesterComponent />
    </div>
  );
};

export default page;
