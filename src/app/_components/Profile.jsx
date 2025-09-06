import Image from "next/image";
import React from "react";
import { useAuth } from "../_context/AuthContext";

const Profile = ({ profile }) => {
  return (
    <div className=" ">
      <img
        alt="default"
        src={profile?.avatar_url ? profile?.avatar_url : "/profiler.png"}
        className="rounded-full  border-4 border-gray-950"
        width={120}
        height={120}
      />
    </div>
  );
};

export default Profile;
