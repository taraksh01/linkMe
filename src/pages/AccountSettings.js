import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../appwrite/userConfig";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import UpdateUserDetails from "./UpdateUserDetails";
import UpdateProfilePic from "./UpdateProfilePic";

const AccountSettings = () => {
  const user = useSelector((state) => state?.authSlice?.user);
  const [userDetails, setUserDetails] = useState({});
  const [tab, setTab] = useState("Account");

  useEffect(() => {
    userService.getUser({ userId: user?.$id }).then((res) => {
      setUserDetails(res);
    });
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="w-full flex my-2">
        <Link className="w-full">
          <Button
            className={`${
              tab === "Account"
                ? "bg-purple-700 rounded-t-3xl border-x-2"
                : "bg-purple-500"
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
                ? "bg-purple-700 rounded-t-3xl border-x-2"
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
                ? "bg-purple-700 rounded-t-3xl border-x-2"
                : "bg-purple-500"
            } rounded-none w-full m-0 transition-all duration-300 hover:bg-purple-700`}
            onClick={() => setTab("Profile pic")}
          >
            Profile pic
          </Button>
        </Link>
      </div>
      <div className={`${tab === "Account" ? "flex" : "hidden"}`}>
        <h1>Account</h1>
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
