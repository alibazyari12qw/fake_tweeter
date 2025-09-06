import Image from "next/image";
import Link from "next/link";
import React from "react";

const CommentComponent = ({ comment }) => {
  console.log(comment);
  return (
    <div className="border-y-1 flex items-center gap-3 border-gray-500 mx-auto p-3 ">
      <div>
        <Image
          alt="profile"
          src="/profiler.png"
          className="rounded-full"
          height={30}
          width={30}
        />
      </div>
      <div className="flex flex-col ">
        <Link href={`/profile/${comment?.user?.id}`}>
          <div className="flex text-[16px] items-center gap-1">
            <p>{comment?.user?.username}</p>
            <p className="text-gray-400 text-[12px]">
              @{comment?.user?.fullname || comment?.user?.username}
            </p>
          </div>
        </Link>
        <div className="">{comment?.content}</div>
      </div>
    </div>
  );
};

export default CommentComponent;
