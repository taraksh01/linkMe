import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../appwrite/postConfig";
import PostCard from "./PostCard";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    postService
      .getPost({ postId })
      .then(
        (res) =>
          res !== "Document with the requested ID could not be found." &&
          setPost(res)
      );
  }, [postId]);

  return post ? (
    <div className="flex flex-wrap mx-auto my-2 max-w-2xl justify-center">
      <PostCard data={post} />
    </div>
  ) : (
    <div className="flex flex-wrap mx-auto my-2 max-w-2xl justify-center">
      Invalid postId
    </div>
  );
};

export default Post;
