// LikeBtn.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../_context/AuthContext";
import toast from "react-hot-toast";
import { addLike } from "../_lib/tweets";
import { CiHeart } from "react-icons/ci";
import { supabase } from "../_lib/supabaseClient";

const LikeBtn = ({ tweet, setTweets }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  // بررسی اینکه کاربر قبلا لایک کرده یا نه
  useEffect(() => {
    const checkLiked = async () => {
      if (!user) return setLiked(false);
      const { data } = await supabase
        .from("likes")
        .select("id")
        .eq("tweet_id", tweet?.id)
        .eq("user_id", user?.id)
        .single();
      setLiked(!!data);
    };
    checkLiked();
  }, [user, tweet?.id]);

  const handleLike = async () => {
    if (!user) {
      toast.error("لطفا ابتدا وارد شوید");
      return;
    }
    if (liked) {
      toast.error("شما قبلا این توییت را لایک کرده‌اید");
      return;
    }
    setLoading(true);
    const res = await addLike(tweet?.id, user?.id);
    setLoading(false);

    if (res.success) {
      setLiked(true); // بلافاصله رنگ را تغییر بده
      toast.success("لایک ثبت شد!");
    } else {
      toast.error("شما قبلا این توییت را لایک کرده‌اید");
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading || liked}
      className={`flex items-center  cursor-pointer gap-1 px-3 py-1 rounded-full transition-colors duration-200 text-sm
        ${liked ? "bg-red-600" : "bg-gray-700 hover:bg-red-600"} text-white`}
    >
      <CiHeart className="text-lg" />
      {tweet?.like_count || 0}
    </button>
  );
};

export default LikeBtn;
