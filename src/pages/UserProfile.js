import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import userService from "../appwrite/userConfig";
import postService from "../appwrite/postConfig";
import PostCard from "../pages/PostCard";
import fileService from "../appwrite/fileConfig";
import Button from "../components/Button";

const UserProfile = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [validUser, setValidUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const loggedInUser = useSelector((state) => state.authSlice.user);

  useEffect(() => {
    userService
      .getByUserName({ userName: username })
      .then((res) => setUserDetails(res.documents[0]));

    userService
      .isAvailable("userName", username)
      .then((res) => setValidUser(res));
  }, [username]);

  useEffect(() => {
    postService
      .getAllPosts([Query.equal("userId", `${userDetails?.$id}`)])
      .then((res) => setUserPosts(res.documents));

    userDetails?.profilePic?.startsWith("http")
      ? setProfilePic(new URL(userDetails?.profilePic))
      : setProfilePic(fileService.previewFile(userDetails?.profilePic));
  }, [userDetails]);

  // previewProfile = async () => {
  //   const file = await fileService.createFile(
  //     document.getElementById("profilepic").files[0]
  //   );
  //   console.log(file);
  // };

  useEffect(() => {
    validUser && setLoading(false);
  }, [validUser]);

  return loading ? (
    <div className="max-w-2xl mx-auto m-2 p-2 text-4xl text-center">
      Please wait while loading user details
    </div>
  ) : validUser == `userName is already taken` ? (
    <div className="max-w-2xl sm:mx-auto mx-1 flex flex-col">
      <div className="w-full">
        <img
          src={profilePic}
          className="h-40 w-40 rounded-full border-red-600 mx-auto"
          alt="profile pic"
        />
      </div>
      <hr className="border-t-2 my-4"></hr>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-3xl">{userDetails?.fullName}</p>
          <span className="text-xl">({userDetails?.userName})</span>
        </div>
        {loggedInUser?.$id === userDetails?.$id && (
          <Link to={"/account/setting"}>
            <Button>Account settings</Button>
          </Link>
        )}
      </div>
      <div className="my-4">
        <h2 className="text-2xl font-medium">Posts</h2>
        <div className="flex flex-wrap gap-1 mx-auto my-2 max-w-2xl justify-center">
          {userPosts?.length > 0 ? (
            userPosts?.map((post) => (
              <div key={post.$id} className="w-full">
                <PostCard data={post} />
              </div>
            ))
          ) : (
            <h2 className="text-2xl font-medium">No posts yet</h2>
          )}
        </div>
      </div>
    </div>
  ) : (
    <h1 className="max-w-2xl mx-auto m-2 p-2 text-5xl text-center">
      User not found
    </h1>
  );
};

export default UserProfile;
