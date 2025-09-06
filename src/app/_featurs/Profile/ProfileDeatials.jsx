"use client";
import { useAuth } from "@/app/_context/AuthContext";
import { useEffect, useState } from "react";
import {
  fetchProfileByUsername,
  fetchLikedTweetsByUser,
  fetchTweetsByUser,
} from "@/app/_lib/fetchProfile";
import ProfileInfo from "@/app/_components/ProfileInfo";
import ProfileHeader from "@/app/_components/ProfileHeader";
import Title from "@/app/_components/Title";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Tweet from "@/app/_components/Tweet";

export default function ProfileDetails({ username }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState("tweets");

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      const profileRes = await fetchProfileByUsername(username);
      if (profileRes) {
        setProfile(profileRes);

        const [likedRes, tweetsRes] = await Promise.all([
          fetchLikedTweetsByUser(username),
          fetchTweetsByUser(username),
        ]);

        if (likedRes.success) setLikedTweets(likedRes.tweets);
        if (tweetsRes.success) setTweets(tweetsRes.tweets);
        console.log(likedTweets);
      }
      setLoading(false);
    };

    loadProfile();
  }, [username]);

  if (loading)
    return <div className="text-center mt-10">در حال بارگذاری...</div>;

  return (
    <div className="w-full relative">
      {/* Header */}
      <Link href="/">
        <div className="sticky top-0 z-50 flex items-center gap-3 bg-black/40 backdrop-blur-md p-3">
          <FaArrowLeft className="text-2xl" />
          <Title>{profile?.username || ""}</Title>
        </div>
      </Link>

      {/* Banner */}
      <div className="w-full h-[200px] bg-gray-900"></div>

      {/* Profile Info */}
      <ProfileInfo profile={profile} />

      {/* Tabs */}
      <ProfileHeader value={isOpen} setValue={setIsOpen} />

      {/* Tweets Section */}
      <div className="mt-4">
        {isOpen === "tweets" &&
          tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
        {isOpen === "liked" &&
          likedTweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
      </div>
    </div>
  );
}
