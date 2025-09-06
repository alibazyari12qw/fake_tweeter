import TweetsList from "./_components/TweetsList";

export default function Page({ searchParams }) {
  // searchParams همون چیزی هست که قبلاً تو TS نوع داده داشت
  return <TweetsList initialParams={searchParams} />;
}
