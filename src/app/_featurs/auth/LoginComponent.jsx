"use client";
import Button from "@/app/_components/Button";
import Input from "@/app/_components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../_context/AuthContext"; // Context

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const router = useRouter();

  const { signInUser } = useAuth(); // استفاده از Context

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await signInUser(email, passWord);
    if (error) {
      toast.error("Login failed: " + error);
    } else {
      toast.success("Welcome Back");
      router.push("/");
    }
  };

  return (
    <div className="mt-10 sm:mx-auto max-w-md w-full px-4">
      <div className="backdrop-blur-3xl flex flex-col gap-7 bg-white/20 dark:bg-black/30 p-6 rounded-xl shadow-lg border border-white/30">
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
        <Link className="text-blue-600" href="/auth/register">
          don't have account?? click here
        </Link>
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
};

export default LoginComponent;
