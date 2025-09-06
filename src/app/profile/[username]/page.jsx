import ProfileDeatials from "@/app/_featurs/Profile/ProfileDeatials";

export default function page({ params }) {
  const { username } = params;

  return (
    <div className="w-[100%] ">
      <ProfileDeatials username={username} />
    </div>
  );
}
