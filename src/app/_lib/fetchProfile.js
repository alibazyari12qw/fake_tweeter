import { supabase } from "./supabaseClient";

export async function fetchProfileByUsername(username) {
  const { data, error } = await supabase
    .from("users")
    .select("id, username, email, bio, avatar_url")
    .eq("id", username)
    .single();

  if (error) {
    console.error("Error fetching profile:", error.message);
    return null;
  }

  return data;
}

export async function fetchAllUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("id, username, email, avatar_url"); // می‌تونی ستون‌های دلخواه رو انتخاب کنی

  if (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }

  return data;
}
export const fetchTweetsByUser = async (userId, limit = 20, offset = 0) => {
  try {
    if (!userId) throw new Error("آیدی کاربر نامعتبر است");

    const { data, error } = await supabase
      .from("tweets")
      .select(
        `
        id,
        content,
        image_url,
        created_at,
        like_count,
        comment_count,
        user:users(id, username, fullname, avatar_url)
        `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // تبدیل داده‌ها برای سازگاری با UI
    const tweetsWithCounts = data.map((tweet) => ({
      ...tweet,
      likeCount: tweet.like_count || 0,
      commentCount: tweet.comment_count || 0,
    }));

    return { success: true, tweets: tweetsWithCounts };
  } catch (error) {
    console.error("Error fetching user tweets:", error.message);
    return { error: error.message };
  }
};
export const fetchLikedTweetsByUser = async (
  userId,
  limit = 20,
  offset = 0
) => {
  try {
    if (!userId) throw new Error("آیدی کاربر نامعتبر است");

    // 1. گرفتن tweet_id هایی که کاربر لایک کرده
    const { data: likes, error: likesError } = await supabase
      .from("likes")
      .select("tweet_id")
      .eq("user_id", userId)
      .range(offset, offset + limit - 1);

    if (likesError) throw likesError;
    if (!likes || likes.length === 0) return { success: true, tweets: [] };

    const tweetIds = likes.map((like) => like.tweet_id);

    // 2. گرفتن اطلاعات کامل توییت‌ها
    const { data: tweets, error: tweetsError } = await supabase
      .from("tweets")
      .select(
        `
        id,
        content,
        image_url,
        created_at,
        like_count,
        comment_count,
        user:users(id, username, fullname, avatar_url)
      `
      )
      .in("id", tweetIds)
      .order("created_at", { ascending: false });

    if (tweetsError) throw tweetsError;

    const tweetsWithCounts = tweets.map((tweet) => ({
      ...tweet,
      likeCount: tweet.like_count || 0,
      commentCount: tweet.comment_count || 0,
    }));

    return { success: true, tweets: tweetsWithCounts };
  } catch (error) {
    console.error("Error fetching liked tweets:", error.message);
    return { error: error.message };
  }
};
// src/app/_lib/profile.js

export const updateUserProfile = async (
  userId,
  { username, full_name, bio, avatar_url }
) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({ username, full_name, bio, avatar_url })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error("Error updating profile:", err.message);
    return { error: err.message };
  }
};
export const uploadAvatar = async (file, userId) => {
  try {
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    return { success: true, url: data.publicUrl };
  } catch (err) {
    console.error("Error uploading avatar:", err.message);
    return { error: err.message };
  }
};
