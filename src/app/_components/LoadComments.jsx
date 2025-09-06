import React from "react";
import CommentComponent from "./CommentComponent";

const LoadComments = ({ comments }) => {
  console.log(comments);
  return (
    <div>
      {comments.map((item) => (
        <CommentComponent comment={item} />
      ))}
    </div>
  );
};

export default LoadComments;
