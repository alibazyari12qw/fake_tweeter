"use client";
import React, { useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import toast from "react-hot-toast";

const NewTweetForm = () => {
  const { user, createTweet } = useAuth();
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in first");

    setLoading(true);
    const result = await createTweet(content, imageFile);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Tweet posted!");
      setContent("");
      setImageFile(null);
      setImagePreview(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 mt-4 border-b border-gray-700 flex flex-col gap-3"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        className="w-full p-2 text-white bg-gray-800 rounded-lg resize-none"
        rows={3}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-2"
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-full max-h-60 object-contain rounded-lg mb-2"
        />
      )}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? "Posting..." : "Tweet"}
      </button>
    </form>
  );
};

export default NewTweetForm;
