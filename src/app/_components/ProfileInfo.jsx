"use client";
import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Button from "./Button";
import { useAuth } from "../_context/AuthContext";
import {
  followUser,
  getFollowCounts,
  isFollowing,
  unfollowUser,
} from "../_lib/follow";
import toast from "react-hot-toast";
import Follows from "./Follows";

const ProfileInfo = ({ profile }) => {
  const { user } = useAuth();
  const [following, setFollowing] = useState(false);
  const [counts, setCounts] = useState({ followers: 0, following: 0 });
  const [open, setOpen] = useState("");
  // 🔹 چک کردن وضعیت فالو
  useEffect(() => {
    const check = async () => {
      if (user?.id && profile?.id) {
        const res = await isFollowing(user.id, profile.id);
        if (res.success) setFollowing(res.following);
      }
    };
    check();
  }, [user, profile?.id]);

  // 🔹 گرفتن تعداد فالورها و فالوینگ‌ها
  useEffect(() => {
    const loadCounts = async () => {
      if (profile?.id) {
        const res = await getFollowCounts(profile.id);
        if (res.success) {
          setCounts({
            followers: res.followers ?? 0,
            following: res.following ?? 0,
          });
        }
      }
    };
    loadCounts();
  }, [profile?.id, following]); // وقتی فالو/آنفالو شد آپدیت میشه

  const handleFollow = async () => {
    if (!user) return toast.error("you'r not login yet");

    if (following) {
      await unfollowUser(user.id, profile.id);
      setFollowing(false);
    } else {
      await followUser(user.id, profile.id);
      setFollowing(true);
    }
  };

  return (
    <div>
      <div className="flex translate-y-[-50px] p-3 justify-between">
        <div>
          <Profile profile={profile} />
          <h1 className="text-3xl px-2">{profile?.username}</h1>
          <p className="px-2 text-gray-400">@{profile?.username}</p>
        </div>
        <div className="mt-[50px]">
          {user?.id !== profile?.id ? (
            <Button
              className={`${following ? "bg-black" : "bg-blue-700 "}`}
              onClick={handleFollow}
            >
              {following ? "unFollow" : "Follow"}
            </Button>
          ) : (
            <Button href="/new-tweet">New Post</Button>
          )}
        </div>
      </div>

      {/* Bio */}
      <div className="translate-y-[-50px]">
        <p className="text-[25px] mx-2">
          {profile?.bio ? profile.bio : "There is no bio"}
        </p>
        <div className="m-2 flex gap-5">
          <p
            onClick={() => setOpen("followers")}
            className="text-gray-500 cursor-pointer"
          >
            followers: <span className="text-white">{counts.followers}</span>
          </p>
          <p
            onClick={() => setOpen("following")}
            className="text-gray-500 cursor-pointer"
          >
            following: <span className="text-white">{counts.following}</span>
          </p>
        </div>
      </div>
      {open === "following" && <Follows />}
      {open === "followers" && <Follows />}
    </div>
  );
};

export default ProfileInfo;
