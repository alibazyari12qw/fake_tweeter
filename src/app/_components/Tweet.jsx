"use client";
import React from "react";
import { FiMessageCircle } from "react-icons/fi";
import LikeBtn from "./LikeBtn";
import Link from "next/link";

const Tweet = ({ tweet, setTweets }) => {
  return (
    <div className="border-y-[1px] p-4 flex gap-4 border-gray-500 hover:bg-gray-800 transition-colors rounded-lg">
      {/* Profile */}
      <div className="relative flex-shrink-0">
        <Link href={`/profile/${tweet?.user?.id}`}>
          <img
            src={tweet?.user?.avatar_url || "/profiler.png"}
            alt={tweet?.user?.username || "User avatar"}
            className="rounded-full w-12 h-12 object-cover"
          />
        </Link>
      </div>

      <div className="flex flex-col w-full gap-2">
        {/* User Info */}
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-100">{tweet?.user?.username}</p>
          <p className="text-gray-500">@{tweet?.user?.username}</p>
        </div>

        {/* Tweet Content */}
        <Link href={`/tweet/${tweet?.id}`}>
          <p className="text-gray-200 break-words">{tweet?.content}</p>
        </Link>

        {/* Tweet Image */}
        {tweet?.image_url && (
          <div className="mt-2 rounded-lg overflow-hidden  max-h-[500px] obje w-full ">
            <img
              src={tweet.image_url}
              alt="Tweet image"
              className="w-full h-full object-center rounded-lg"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center text-gray-400 mt-2">
          <Link href={`/tweet/${tweet?.id}`}>
            <span className="flex items-center gap-1 hover:text-blue-400 cursor-pointer transition-colors">
              <FiMessageCircle size={18} /> {tweet?.commentCount || 0}
            </span>
          </Link>
          <LikeBtn tweet={tweet} setTweets={setTweets} />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
