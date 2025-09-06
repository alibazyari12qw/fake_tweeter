import toast from "react-hot-toast";
import { supabase } from "./supabaseClient";

export const followUser = async (followerId, followingId) => {
  try {
    const { error } = await supabase
      .from("follows")
      .insert([{ follower_id: followerId, following_id: followingId }]);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Error Folowing user", err.message);
    return { error: err.message };
  }
};
export const unfollowUser = async (followerId, followingId) => {
  try {
    const { error } = await supabase
      .from("follows")
      .delete()
      .eq("follower_id", followerId)
      .eq("following_id", followingId);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Error cheking follow status", err.message);
    return { error: err.message };
  }
};
export const getFollowCounts = async (userId) => {
  try {
    const [{ count: followers }, { count: following }] = await Promise.all([
      supabase
        .from("follows")
        .select("*", { count: "exact" })
        .eq("following_id", userId),
      supabase
        .from("follows")
        .select("*", { count: "exact" })
        .eq("follower_id", userId),
    ]);

    return { success: true, followers, following };
  } catch (err) {
    console.error("Error fetching follow counts:", err.message);
    return { error: err.message };
  }
};
export const isFollowing = async (followerId, followingId) => {
  try {
    const { data, error } = await supabase
      .from("follows")
      .select("*")
      .eq("follower_id", followerId)
      .eq("following_id", followingId)
      .maybeSingle();

    if (error) throw error;
    return { success: true, following: !!data };
  } catch (err) {
    console.error("Error checking follow status:", err.message);
    return { error: err.message };
  }
};
