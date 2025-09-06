"use client";
import React from "react";
import Button from "./Button";

const TextArea = ({ content, handleSubmit, loading, setContent }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 mt-4 border-b border-gray-700 flex flex-col gap-3"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="نظر خود را بنویسید..."
        className="w-full p-2 text-white bg-gray-800 rounded-lg resize-none"
        rows={3}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "در حال ارسال..." : "ارسال کامنت"}
      </Button>
    </form>
  );
};

export default TextArea;
