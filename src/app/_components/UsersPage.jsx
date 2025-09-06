"use client";
import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../_lib/fetchProfile";
import Link from "next/link";
import Button from "./Button";
import Input from "./Input";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filterdUser, setFiltredUser] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllUsers().then((data) => {
      setUsers(data);
      setFiltredUser(data); // اینجا هم فیلترد یوزر رو ست میکنیم
    });
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFiltredUser(users);
    } else {
      const filtred = users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
      );
      setFiltredUser(filtred);
    }
  }, [users, search]);

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="w-full relative h-full">
        <Input placeHolder="search..." value={search} setValue={setSearch} />
      </div>

      {filterdUser.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between bg-gray-900 hover:bg-gray-800 transition rounded-2xl p-3"
        >
          {/* سمت چپ: اطلاعات کاربر */}
          <Link
            href={`/profile/${user?.id}`}
            className="flex items-center gap-3"
          >
            <img
              src={user?.avatar_url || "/profiler.png"}
              alt={user?.username || "User avatar"}
              className="rounded-full w-12 h-12 object-cover"
            />
            <div className="flex flex-col">
              <p className="text-white text-base font-medium whitespace-nowrap">
                {user.username}
              </p>
              <p className="text-gray-400 text-sm whitespace-nowrap">
                @{user.username}
              </p>
            </div>
          </Link>

          {/* سمت راست: دکمه فالو */}
          <Button>Follow</Button>
        </div>
      ))}
    </div>
  );
};

export default UsersPage;
