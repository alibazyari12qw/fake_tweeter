import React, { Suspense } from "react";
import TweetsList from "./_components/TweetsList";

const Page = () => (
  <div className="mt-7 ">
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <TweetsList />
    </Suspense>
  </div>
);

export default Page;
