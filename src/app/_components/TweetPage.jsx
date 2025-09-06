"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { addComment, fetchComments, fetchTweetById } from "../_lib/tweets";
import Tweet from "./Tweet";
import TextArea from "@/app/_components/TextArea";
import { useAuth } from "../_context/AuthContext";
import toast from "react-hot-toast";
import CommentComponent from "./CommentComponent";
import LoadComments from "./LoadComments";

const TweetPage = () => {
  const params = useParams();
  const id = params?.id;
  const [tweet, setTweet] = useState(null);
  const [tweetComments, setTweetComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  const loadData = async () => {
    if (!id) return;
    setLoading(true);

    const [tweetRes] = await Promise.all([fetchTweetById(id)]);
    const commentRes = await fetchComments(id);

    if (tweetRes.success) setTweet(tweetRes.data);
    if (commentRes.success) setTweetComments(commentRes.comments);

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("لطفا وارد حساب شوید");
      return;
    }
    if (!comment.trim()) {
      toast.error("کامنت نمی‌تواند خالی باشد");
      return;
    }

    setSubmitting(true);
    const res = await addComment(id, user.id, comment);
    setSubmitting(false);

    if (res.success) {
      toast.success("کامنت اضافه شد");
      setComment("");
      loadData(); // دوباره کامنت‌ها را بگیر
    } else {
      toast.error("مشکل در اضافه کردن کامنت");
    }
  };

  if (loading) return <div>در حال بارگذاری...</div>;

  return (
    <div>
      <div className="border-b border-gray-500 m-5">
        <Tweet tweet={tweet} />
      </div>
      <div className="border-b border-gray-500 m-5">
        <TextArea
          handleSubmit={handleSubmit}
          content={comment}
          setContent={setComment}
          loading={submitting}
        />
      </div>

      <div className="m-5">
        <h3 className="text-lg font-bold mb-2">کامنت‌ها:</h3>
        <LoadComments comments={tweetComments} />
      </div>
    </div>
  );
};

export default TweetPage;
