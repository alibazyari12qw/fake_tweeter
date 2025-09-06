"use client";
import { useEffect } from "react";
import { supabase } from "./supabaseClient";

export const useRealtime = (setTweets) => {
  useEffect(() => {
    // Subscription برای لایک‌ها
    const likesSub = supabase
      .channel("public:likes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "likes" },
        (payload) => {
          const { tweet_id } = payload.new || {};
          setTweets((prev) =>
            prev.map((t) =>
              t.id === tweet_id
                ? { ...t, like_count: (t.like_count || 0) + 1 }
                : t
            )
          );
        }
      )
      .subscribe();

    // Subscription برای کامنت‌ها
    const commentsSub = supabase
      .channel("public:comments")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments" },
        (payload) => {
          const { tweet_id } = payload.new || {};
          setTweets((prev) =>
            prev.map((t) =>
              t.id === tweet_id
                ? { ...t, comments_count: (t.comments_count || 0) + 1 }
                : t
            )
          );
        }
      )
      .subscribe();

    // Subscription برای توییت‌های جدید
    const tweetsSub = supabase
      .channel("public:tweets")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tweets" },
        (payload) => {
          setTweets((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(likesSub);
      supabase.removeChannel(commentsSub);
      supabase.removeChannel(tweetsSub);
    };
  }, [setTweets]);
};
