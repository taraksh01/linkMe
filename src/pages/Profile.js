import { useSelector } from "react-redux";
import userService from "../appwrite/userConfig";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: "Full Name",
    userName: "username",
  });
  const user = useSelector((state) => state?.authSlice?.user);
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    setUserDetails(await userService.getUser({ userId: user?.$id }));
  };

  return (
    <Link
      className="flex items-center gap-2 px-1 rounded-lg sm:bg-slate-200"
      to={`/${userDetails.userName}`}
    >
      <div className="flex flex-col justify-evenly max-sm:hidden">
        <h1 className="text-lg font-medium capitalize">
          {userDetails?.fullName}
        </h1>
        <h2 className="lowercase">{userDetails.userName}</h2>
      </div>
      <img
        src={userDetails?.profilePic}
        alt={userDetails?.userName}
        className="bg-black rounded-full border border-black w-12 h-12"
      />
    </Link>
  );
};

export default Profile;
