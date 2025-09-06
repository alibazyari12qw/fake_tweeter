import TweetsList from "./_components/TweetsList";

// اینجا searchParams از سرور میاد
export default function Page({ searchParams }) {
  return <TweetsList initialParams={searchParams} />;
}
