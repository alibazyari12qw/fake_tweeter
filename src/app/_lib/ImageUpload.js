import { supabase } from "./supabaseClient";

/**
 * آپلود عکس به باکت tweets-images
 * @param {File} file
 * @param {string} userId
 * @returns {string|null} - آدرس عمومی عکس یا null
 */
export const uploadTweetImage = async (file, userId) => {
  if (!file || !userId) return null;
  const fileName = `${userId}_${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("tweets-images")
    .upload(fileName, file, { upsert: false });

  if (error) {
    console.error("Supabase upload error:", error.message);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from("tweets-images")
    .getPublicUrl(fileName);

  return urlData?.publicUrl || null;
};
