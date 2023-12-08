import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService from "../appwrite/userConfig";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import UpdateUserDetails from "./UpdateUserDetails";
import UpdateProfilePic from "./UpdateProfilePic";
import postService from "../appwrite/postConfig";
import fileService from "../appwrite/fileConfig";
import { Query } from "appwrite";
import authService from "../appwrite/authConfig";
import { logout as sliceLogout } from "../store/features/authSlice";

const AccountSettings = () => {
  const user = useSelector((state) => state?.authSlice?.user);
  const [userDetails, setUserDetails] = useState({});
  const [tab, setTab] = useState("Account");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    userService.getUser({ userId: user?.$id }).then((res) => {
      setUserDetails(res);
    });
  }, [user]);

  const deleteAccount = async () => {
    await userService.deleteUser({ userId: user?.$id });
    const allPostByUser = await postService.getAllPosts([
      Query.equal("userId", user?.$id),
    ]);
    allPostByUser?.documents?.map((item) => postService?.deletePost(item?.$id));
    await fileService.deleteFile(user?.$id);
    await authService.blockAccount();
    dispatch(sliceLogout());
    navigate("/");
  };

  const logout = () => {
    authService.logout().then((res) => {
      if (res === "Logged out successfully") {
        localStorage.clear();
        dispatch(sliceLogout());
        navigate("/");
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="w-full flex my-2 overflow-y-auto">
        <Link className="w-full">
          <Button
            className={`${
              tab === "Account" ? "bg-purple-700 border-x-2" : "bg-purple-500"
            } rounded-none w-full m-0 transition-all duration-300 hover:bg-purple-700`}
            onClick={() => setTab("Account")}
          >
            Account Settings
          </Button>
        </Link>
        <Link className="w-full">
          <Button
            className={`${
              tab === "User Details"
                ? "bg-purple-700 border-x-2"
                : "bg-purple-500"
            } rounded-none w-full m-0 transition-all duration-300 hover:bg-purple-700`}
            onClick={() => setTab("User Details")}
          >
            User Details
          </Button>
        </Link>
        <Link className="w-full">
          <Button
            className={`${
              tab === "Profile pic"
                ? "bg-purple-700 border-x-2"
                : "bg-purple-500"
            } rounded-none w-full m-0 transition-all duration-300 hover:bg-purple-700`}
            onClick={() => setTab("Profile pic")}
          >
            Profile pic
          </Button>
        </Link>
      </div>
      <div
        className={`${
          tab === "Account" ? "flex" : "hidden"
        } bg-gray-100 flex-col`}
      >
        <div className="flex justify-between items-center px-2 w-full">
          <p className="text-red-500">
            This action will log you out fron current session .
          </p>
          <Button
            color="text-red-600"
            bgColor="bg-red-200"
            type="submit"
            className="m-4 shadow-md hover:bg-red-300"
            onClick={logout}
          >
            Log Out
          </Button>
        </div>
        <div className="flex justify-between items-center px-2 w-full">
          <p className="text-red-500">
            The user will be permanently deleted, including all data associated
            with this user. This action is irreversible.
          </p>
          <Button
            type="submit"
            onClick={deleteAccount}
            color="text-red-600"
            bgColor="bg-red-200"
            className="m-4 shadow-md hover:bg-red-300"
          >
            Delete Account
          </Button>
        </div>
      </div>
      <div className={`flex ${tab === "User Details" ? "flex" : "hidden"}`}>
        <UpdateUserDetails
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          userId={user?.$id}
        />
      </div>
      <div className={`${tab === "Profile pic" ? "flex" : "hidden"}`}>
        <UpdateProfilePic
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          userId={user?.$id}
        />
      </div>
    </div>
  );
};

export default AccountSettings;
