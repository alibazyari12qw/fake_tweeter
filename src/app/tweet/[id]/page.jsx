import TweetPage from "@/app/_components/TweetPage";
import React, { Suspense } from "react";

const Page = () => (
  <div>
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <TweetPage />
    </Suspense>
  </div>
);

export default Page;
