import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import postService from "../appwrite/postConfig";
import { TbThumbUp, TbThumbUpFilled } from "react-icons/tb";

const Like = ({ post, likes, postId }) => {
  const loggedInUser = useSelector((state) => state?.authSlice?.user);
  const [allLikes, setAllLikes] = useState(likes);
  const [liked, setLiked] = useState(allLikes?.includes(loggedInUser?.name));

  useEffect(() => {
    postService.getPost({ postId }).then((res) => setAllLikes(res?.likes));
  }, []);

  const like = () => {
    postService
      .updatePost({
        postId,
        post,
        likes: !liked
          ? [...allLikes, loggedInUser?.name]
          : likes.filter((name) => name !== loggedInUser?.name),
      })
      .then((res) => setAllLikes(res?.likes));
    setLiked(!liked);
  };

  return (
    <div
      className="w-full flex items-end justify-center px-2 gap-1 cursor-pointer"
      onClick={like}
    >
      <p className="text-xl">{allLikes?.length}</p>
      <div className="text-3xl">
        {liked ? (
          <TbThumbUpFilled className="transition-all duration-500 text-purple-700" />
        ) : (
          <TbThumbUp className="transition-all duration-500 text-purple-700" />
        )}
      </div>
    </div>
  );
};

export default Like;
