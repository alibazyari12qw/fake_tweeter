"use client";
import H2 from "@/app/_components/H2";
import UserRight from "@/app/_components/UserRight";
import { useAuth } from "@/app/_context/AuthContext";
import { fetchAllUsers } from "@/app/_lib/fetchProfile";
import React, { useEffect, useState } from "react";

const RightNavigation = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadUsers = async () => {
      const allUsers = await fetchAllUsers();
      console.log("All USERS", allUsers);
      setUsers(allUsers);
    };

    loadUsers(); // ✅ درست شد
  }, []);

  return (
    <div className="p-4 md:block hidden rounded border-l mt-10 border-gray-500 w-full">
      <div className=" rounded-4xl border-2 border-gray-700 p-2">
        <H2>How to follw</H2>
        {users.length > 0 ? (
          users
            .filter((item) => user?.id !== item?.id) // 🔹 کاربران غیر از خودت
            .map((item) => <UserRight key={item.id} user={item} />)
        ) : (
          <p className="text-gray-400">No users found</p>
        )}
      </div>
    </div>
  );
};

export default RightNavigation;
