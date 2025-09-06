"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../_lib/supabaseClient";
import toast from "react-hot-toast";
import { uploadTweetImage } from "../_lib/ImageUpload";

const AuthContext = createContext();

export const AuthProviedr = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ گرفتن پروفایل کامل با fullname
  const fetchUserProfile = async (id) => {
    const { data, error } = await supabase
      .from("users")
      .select("id,username,email,fullname,bio,avatar_url") // 👈 fullname اضافه شد
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching user profile:", error.message);
      return null;
    }
    return data;
  };
  // new-tweet
  // داخل AuthContext
  const createTweet = async (content, imageFile) => {
    if (!user) return { error: "User not logged in" };
    if (!content && !imageFile) return { error: "Tweet cannot be empty" };

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadTweetImage(imageFile, user.id);
        if (!imageUrl) return { error: "Image upload failed" };
      }

      const { data, error } = await supabase
        .from("tweets")
        .insert([{ user_id: user.id, content, image_url: imageUrl }])
        .select();

      if (error) throw error;

      // اضافه کردن به state کاربر
      setUser((prev) => ({
        ...prev,
        tweets: prev.tweets ? [data[0], ...prev.tweets] : [data[0]],
      }));

      return { success: true, tweet: data[0] };
    } catch (error) {
      return { error: error.message };
    }
  };

  // ✅ Sign Up
  const signUpUser = async (email, password, username, fullname) => {
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      const userId = data.user.id;

      // درج در جدول users
      await supabase.from("users").insert([
        {
          id: userId,
          username,
          email,
          fullname, // 👈 اینجا هم درج شد
        },
      ]);

      // درج در جدول profiles
      await supabase.from("profiles").insert([
        {
          id: userId,
          bio: "",
          avatar_url: "",
        },
      ]);

      // گرفتن اطلاعات کامل
      const fullUser = await fetchUserProfile(userId);
      setUser(fullUser);
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  };

  // ✅ Sign In
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const fullUser = await fetchUserProfile(data.user.id);
      setUser(fullUser);
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  };

  // ✅ Logout
  const signOutUser = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // ✅ گرفتن وضعیت اولیه کاربر
  useEffect(() => {
    const getUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        const fullUser = await fetchUserProfile(data.session.user.id);
        setUser(fullUser);
      }
      setLoading(false);
    };
    getUserSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const fullUser = await fetchUserProfile(session.user.id);
          setUser(fullUser);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        createTweet,
        user,
        loading,
        signUpUser,
        signInUser,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
