import React from "react";

const ProfileHeader = ({ value, setValue }) => {
  return (
    <div className="flex gap-5 justify-center items-center border-b border-gray-700 mt-4">
      <button
        onClick={() => setValue("tweets")}
        className={`p-2 border-b-2 transition-all duration-300 cursor-pointer ${
          value === "tweets"
            ? "border-blue-600 text-blue-600"
            : "border-transparent hover:border-blue-600"
        }`}
      >
        Tweets
      </button>
      <button
        onClick={() => setValue("liked")}
        className={`p-2 border-b-2 transition-all duration-300 cursor-pointer ${
          value === "liked"
            ? "border-blue-600 text-blue-600"
            : "border-transparent hover:border-blue-600"
        }`}
      >
        Liked Tweets
      </button>
    </div>
  );
};

export default ProfileHeader;
