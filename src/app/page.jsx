import { Suspense } from "react";
import TweetsList from "./TweetsList";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading tweets...</p>}>
      <TweetsList />
    </Suspense>
  );
}
