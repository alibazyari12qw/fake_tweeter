"use client";
import { Logo } from "@/app/_components/Logo";
import Link from "next/link";
import React from "react";
import { IoIosHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/_context/AuthContext";
import { FiUsers } from "react-icons/fi";

const LeftNavigation = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const links = [
    { href: "/", label: "Home", icon: <IoIosHome className="text-4xl" /> },
    user && {
      href: `/profile/${user.id}`, // ✅ فقط وقتی user هست این اضافه میشه
      label: "Profile",
      icon: <CgProfile className="text-4xl" />,
    },
    !user && {
      href: `/auth/login`, // ✅ فقط وقتی user هست این اضافه میشه
      label: "login",
      icon: <CgProfile className="text-4xl" />,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <IoSettingsOutline className="text-4xl" />,
    },
    {
      href: "/users",
      label: "Other users",
      icon: <FiUsers className="text-4xl" />,
    },
  ].filter(Boolean); // ✅ لینک‌های null رو حذف می‌کنه

  return (
    <div className="relative p- sm:p-10 border-r max-sm:max-w-[100px] border-gray-500 h-screen">
      <Logo />
      <div className="flex flex-col mt-6 gap-4 items-center sm:items-start">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 py-1 px-2 rounded-4xl text-[25px] transition 
              ${
                pathname === link.href
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
          >
            {link.icon}
            <p className="md:block whitespace-nowrap  w-full lg:pr-20 hidden">
              {link.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftNavigation;
