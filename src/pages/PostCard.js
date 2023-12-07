import { useEffect, useState } from "react";
import userService from "../appwrite/userConfig";
import fileService from "../appwrite/fileConfig";
import postService from "../appwrite/postConfig";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Post = ({ data }) => {
  const { $createdAt, $id, $permissions, $updatedAt, post, userId } = data;
  const [userDetails, setUserDetails] = useState(null);
  const loggedInUser = useSelector((state) => state?.authSlice?.user);
  const [profilePic, setProfilePic] = useState(null);
  const [postedAt, setPostedAt] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userService.getUser({ userId }).then((res) => setUserDetails(res));
    const date = new Date();
    const updated = new Date($updatedAt);
    const sec = Math.floor((date - updated) / 1000);
    const min = Math.floor(sec / 60);
    const hour = Math.floor(min / 60);
    const day = Math.floor(hour / 24);
    const week = Math.floor(day / 7);
    const month = Math.floor(week / 4.28);
    const year = Math.floor(month / 12);
    setPostedAt(
      year > 0
        ? `${year} year ago`
        : month > 0
        ? `${month} month ago`
        : week > 0
        ? `${week} week ago`
        : day > 0
        ? `${day} day ago`
        : hour > 0
        ? `${hour} hour ago`
        : min > 0
        ? `${min} min ago`
        : `${sec} sec ago`
    );
  }, []);

  useEffect(() => {
    userDetails?.profilePic?.startsWith("http")
      ? setProfilePic(new URL(userDetails?.profilePic))
      : setProfilePic(fileService.previewFile(userDetails?.profilePic));
  }, [userDetails]);

  return (
    userDetails && (
      <div className="m-1 rounded-lg bg-gray-100 px-2 w-full mx-auto">
        <div className="flex">
          <Link to={`/${userDetails?.userName}`} className="flex">
            <img src={profilePic} className="rounded-full h-12 w-12" />
            <div className="flex flex-col ml-2 justify-center">
              <div className="text-xl font-medium">
                {userDetails?.fullName}
                <span className="pl-1">({userDetails?.userName})</span>
              </div>
              <div className="text-sm">{postedAt}</div>
            </div>
          </Link>
          {loggedInUser?.$id === userId && (
            <div className="px-2 self-start ml-auto text-2xl">⋮</div>
          )}
        </div>

        <div className="text-2xl text-justify py-2">
          <Link to={`/post/${$id}`}>{post}</Link>
        </div>
      </div>
    )
  );
};

export default Post;
