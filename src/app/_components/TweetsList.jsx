"use client";
import { useEffect, useState } from "react";
import { fetchTweets } from "../_lib/tweets";
import Tweet from "./Tweet";
import { useRealtime } from "../_lib/useRealTime";
import Input from "./Input";
import { filterButtons } from "../_lib/data";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const TweetsList = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // بارگذاری اولیه tweets
  useEffect(() => {
    const loadTweets = async () => {
      const allTweets = await fetchTweets(20);
      setTweets(allTweets);
      setLoading(false);
    };
    loadTweets();
  }, []);

  // بازیابی state از URL هنگام لود اولیه
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlFilter = searchParams.get("filter") || "All";

    setSearch(urlSearch);
    setFilter(urlFilter);
  }, [searchParams]);

  // به‌روزرسانی URL وقتی state تغییر می‌کند (با debouncing)
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (filter !== "All") params.set("filter", filter);

      const queryString = params.toString();
      const currentQuery = searchParams.toString();

      // فقط اگر query تغییر کرده، آپدیت کن
      if (queryString !== currentQuery) {
        router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, {
          scroll: false,
        });
      }
    }, 300); // تأخیر 300ms

    return () => clearTimeout(handler);
  }, [search, filter, router, pathname, searchParams]);

  useRealtime(setTweets);

  if (loading) return <p>Loading...</p>;

  // ✅ اعمال فیلتر و سرچ روی tweets
  const filteredTweets = tweets
    .filter((tweet) =>
      search ? tweet.content.toLowerCase().includes(search.toLowerCase()) : true
    )
    .sort((a, b) => {
      if (filter === "mostLike") return b.likeCount - a.likeCount; // بیشترین لایک
      if (filter === "NewTweets")
        return new Date(b.created_at) - new Date(a.created_at); // جدیدترین
      if (filter === "OldTweets")
        return new Date(a.created_at) - new Date(b.created_at); // قدیمی‌ترین
      return 0; // All
    });

  return (
    <div className="my-[-20px]">
      <div className="p-2">
        <Input
          lable="search amoung tweets"
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
};

export default TweetsList;
