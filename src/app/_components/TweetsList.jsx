"use client";

import { useEffect, useState } from "react";
import { fetchTweets } from "../_lib/tweets";
import Tweet from "./Tweet";
import { useRealtime } from "../_lib/useRealTime";
import Input from "./Input";
import { filterButtons } from "../_lib/data";
import { useRouter, usePathname } from "next/navigation";

export default function TweetsList({ initialParams }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialParams.search || "");
  const [filter, setFilter] = useState(initialParams.filter || "All");

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loadTweets = async () => {
      const allTweets = await fetchTweets(20);
      setTweets(allTweets);
      setLoading(false);
    };
    loadTweets();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (filter !== "All") params.set("filter", filter);

      const queryString = params.toString();
      router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, {
        scroll: false,
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [search, filter, router, pathname]);

  useRealtime(setTweets);

  if (loading) return <p>Loading...</p>;

  const filteredTweets = tweets
    .filter((tweet) =>
      search ? tweet.content.toLowerCase().includes(search.toLowerCase()) : true
    )
    .sort((a, b) => {
      if (filter === "mostLike") return b.likeCount - a.likeCount;
      if (filter === "NewTweets")
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      if (filter === "OldTweets")
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      return 0;
    });

  return (
    <div className="my-[-20px]">
      <div className="p-2">
        <Input
          lable="search among tweets"
          className="mb-3"
          placeHolder="search..."
          value={search}
          setValue={setSearch}
        />
        <div className="flex p-2 items-center justify-center gap-6">
          {filterButtons.map((item) => (
            <button
              key={item.buttonName}
              className={`bg-gray-800 hover:text-white cursor-pointer hover:bg-gray-600 px-3 py-1 rounded-2xl ${
                filter === item.buttonName ? "text-black bg-white" : ""
              }`}
              onClick={() => setFilter(item.buttonName)}
            >
              {item.buttonName}
            </button>
          ))}
        </div>
      </div>
      {filteredTweets.map((tweet) => (
        <Tweet setTweets={setTweets} key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}
