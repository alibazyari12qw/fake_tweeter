import toast from "react-hot-toast";
import { supabase } from "./supabaseClient";

// دریافت توییت‌ها با تعداد لایک و کامنت از ستون‌ها
export const fetchTweets = async (limit = 20, offset = 0) => {
  const { data, error } = await supabase
    .from("tweets")
    .select(
      `
      id,
      content,
      created_at,
      like_count,
      image_url,
      comment_count,
      user:users(id,username,fullname,avatar_url)
    `
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    toast.error("Error fetching tweets: " + error.message);
    return [];
  }

  // تبدیل داده برای کامپوننت
  const tweetsWithCounts = data.map((tweet) => ({
    ...tweet,
    likeCount: tweet.like_count || 0,
    commentsCount: tweet.comment_count || 0,
  }));

  return tweetsWithCounts;
};

// لایک کردن توییت و بروزرسانی ستون like_count

export const addLike = async (tweetId, userId) => {
  try {
    // بررسی اینکه کاربر قبلا لایک نکرده باشه
    const { data: existing } = await supabase
      .from("likes")
      .select("*")
      .eq("tweet_id", tweetId)
      .eq("user_id", userId)
      .single();

    if (existing) {
      toast.error("شما قبلا این توییت را لایک کرده‌اید!");
      return { error: "Already liked" };
    }

    // اضافه کردن لایک
    const { error: likeError } = await supabase
      .from("likes")
      .insert([{ tweet_id: tweetId, user_id: userId }]);

    if (likeError) throw likeError;

    // فقط اگر لایک جدید اضافه شد، مقدار like_count را آپدیت کن
    const { data: tweetData, error: tweetError } = await supabase
      .from("tweets")
      .select("like_count")
      .eq("id", tweetId)
      .single();

    if (tweetError) throw tweetError;

    await supabase
      .from("tweets")
      .update({ like_count: (tweetData.like_count || 0) + 1 })
      .eq("id", tweetId);

    return { success: true };
  } catch (error) {
    console.error("Error adding like:", error.message);
    toast.error("خطا هنگام لایک کردن: " + error.message);
    return { error: error.message };
  }
};

// گرفتن یک توییت با اطلاعات کاربر
export const fetchTweetById = async (tweetId) => {
  try {
    const { data, error } = await supabase
      .from("tweets")
      .select(
        `
        id,
        content,
        image_url,
        created_at,
        like_count,
        user:users(id, username, fullname, avatar_url)
      `
      )
      .eq("id", tweetId)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    toast.error("خطا در گرفتن توییت: " + err.message);
    return { error: err.message };
  }
};

export const addComment = async (tweetId, userId, content) => {
  try {
    // 1. اضافه کردن کامنت
    const { data: comment, error: commentError } = await supabase
      .from("comments")
      .insert([{ tweet_id: tweetId, user_id: userId, content }])
      .select()
      .single();

    if (commentError) throw commentError;

    // 2. گرفتن تعداد فعلی
    const { data: tweetData, error: fetchError } = await supabase
      .from("tweets")
      .select("comment_count")
      .eq("id", tweetId)
      .single();

    if (fetchError) throw fetchError;

    const newCount = (tweetData.comment_count || 0) + 1;

    // 3. آپدیت comment_count
    const { error: updateError } = await supabase
      .from("tweets")
      .update({ comment_count: newCount })
      .eq("id", tweetId);

    if (updateError) throw updateError;

    return { success: true, data: comment };
  } catch (error) {
    console.error("Error adding comment:", error.message);
    return { error: error.message };
  }
};

export const fetchComments = async (tweetId) => {
  try {
    if (!tweetId) {
      throw new Error("آیدی توییت نامعتبر است");
    }

    const { data, error } = await supabase
      .from("comments")
      .select(
        `
        id,
        content,
        created_at,
        user:users(id, username, fullname, avatar_url)
        `
      )
      .eq("tweet_id", tweetId)
      .order("created_at", { ascending: false }); // برای نمایش از قدیمی به جدید

    if (error) throw error;

    return { success: true, comments: data };
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    toast.error("خطا در دریافت کامنت‌ها: " + error.message);
    return { error: error.message };
  }
};
