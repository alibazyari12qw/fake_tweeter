import TweetPage from "@/app/_components/TweetPage";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <TweetPage />
      </Suspense>
    </div>
  );
};

export default page;
