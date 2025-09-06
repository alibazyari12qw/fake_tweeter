import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";

const UserRight = ({ user }) => {
  return (
    <Link href={`/profile/${user.id}`}>
      <div className="m-2 max-h-[60px] flex justify-between hover:bg-gray-800 transition-all duration-300 bg-gray-900 rounded-4xl p-2">
        <div className="flex ">
          <div className="h-[100%] flex items-center justify-center w-[100%]">
            <img
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full max-md:w-[20px] max-md:h-[20px] items-center"
              src={user?.avatar_url || "/profiler.png"} // عکس پیش‌فرض
            />
          </div>
          <div className="flex flex-col justify-center overflow-hidden">
            <p className="text-[20px] max-md:text-[15px] truncate">
              {user.username}
            </p>
            <p className="text-[15px] max-md:text-[12px] text-gray-500 truncate">
              @{user.username}
            </p>
          </div>
        </div>
        <Button className="max-lg:hidden">Follow</Button>
      </div>
    </Link>
  );
};

export default UserRight;
