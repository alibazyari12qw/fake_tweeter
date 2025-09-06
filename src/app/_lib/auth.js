import { supabase } from "../_lib/supabaseClient";

export const signUpUser = async (email, password, username) => {
  try {
    // 1. ثبت‌نام در Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      return { error: signUpError.message };
    }

    // 2. گرفتن user id
    const user = data.user;
    if (!user) {
      return { error: "User not created" };
    }

    // 3. درج رکورد در جدول users
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id, // همان uuid کاربر
        username,
        email,
      },
    ]);

    if (insertError) {
      return { error: insertError.message };
    }

    return { user };
  } catch (err) {
    return { error: err.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return { user: data.user, session: data.session };
  } catch (err) {
    console.error("Login error:", err.message);
    return { error: err.message };
  }
};
