"use client";
import Button from "@/app/_components/Button";
import Input from "@/app/_components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../_context/AuthContext"; // استفاده از Context

const RegiesterComponent = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [passWord, setPassWord] = useState("");
  const router = useRouter();

  const { signUpUser } = useAuth(); // فانکشن از Context

  const handleSingUp = async (e) => {
    e.preventDefault();
    const { error } = await signUpUser(email, passWord, userName, fullName);
    if (error) {
      toast.error("Sign Up failed: " + error);
    } else {
      toast.success("Now Login :)");
      router.push("/auth/login");
    }
  };

  return (
    <div className="mt-10 sm:mx-auto max-w-md w-full px-4">
      <div className="backdrop-blur-3xl flex flex-col gap-4 bg-white/20 dark:bg-black/30 p-6 rounded-xl shadow-lg border border-white/30">
        <Input
          value={userName}
          setValue={setUserName}
          lable="user name"
          className="w-full sm:w-auto"
        />
        <Input
          value={fullName}
          setValue={setFullName}
          lable="Full Name"
          className="w-full sm:w-auto"
        />
        <Input
          value={email}
          setValue={setEmail}
          lable="Email address"
          className="w-full sm:w-auto"
        />
        <Input
          value={passWord}
          setValue={setPassWord}
          lable="Password"
          className="w-full sm:w-auto"
        />
        <Link className="text-blue-600" href="/auth/login">
          you already have account click here
        </Link>
        <Button onClick={handleSingUp}>Login</Button>
      </div>
    </div>
  );
};

export default RegiesterComponent;
