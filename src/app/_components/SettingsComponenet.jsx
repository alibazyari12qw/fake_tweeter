"use client";
import React, { useState } from "react";
import Title from "./Title";
import Input from "./Input";
import { useAuth } from "../_context/AuthContext";
import { updateUserProfile, uploadAvatar } from "@/app/_lib/fetchProfile";

import Button from "./Button";
import toast from "react-hot-toast";

const SettingsComponenet = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.username);
  const [fullname, setfullname] = useState(user?.full_name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarUrl, setavatarUrl] = useState(user?.avatar_url || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const res = await updateUserProfile(user.id, {
      username,
      fullname: fullname,
      bio,
      avatar_url: avatarUrl,
    });
    setLoading(false);
    if (res.success) {
      toast.success("profile is updated");
    } else {
      toast.error("there is a problem" + res.error);
    }
  };
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const res = await uploadAvatar(file, user.id);

    if (res.success) {
      setavatarUrl(res.url);

      // ✅ بعد از آپلود عکس، پروفایل رو هم آپدیت کن
      const updateRes = await updateUserProfile(user.id, {
        username,
        fullname: fullname,
        bio,
        avatar_url: res.url, // آدرس جدید
      });

      if (updateRes.success) {
        toast.success("عکس پروفایل آپلود و ذخیره شد");
      } else {
        toast.error(
          "آپلود شد اما ذخیره در پروفایل مشکل داشت: " + updateRes.error
        );
      }
    } else {
      toast.error("خطا در آپلود عکس: " + res.error);
    }
  };

  return (
    <div className="m-5 flex flex-col gap-7">
      <Title>Settings</Title>
      <div className="flex flex-col gap-3">
        <Input label="Username" value={username} setValue={setUsername} />
        <Input label="Full name" value={fullname} setValue={setfullname} />
        <Input label="Bio" value={bio} setValue={setBio} />

        {/* ✅ Input آپلود عکس */}
        <div>
          <label className="block text-gray-400 mb-1">Avatar</label>
          <input type="file" accept="image/*" onChange={handleUpload} />
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-20 h-20 rounded-full mt-2"
            />
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </div>
    </div>
  );
};

export default SettingsComponenet;
