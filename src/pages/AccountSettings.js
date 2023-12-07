import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../appwrite/userConfig";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const AccountSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useSelector((state) => state?.authSlice?.user);
  const [userDetails, setUserDetails] = useState({});
  const [message, setMessage] = useState(null);
  const [tab, setTab] = useState("Account");

  useEffect(() => {
    userService.getUser({ userId: user?.$id }).then((res) => {
      setUserDetails(res);
    });
  }, [userDetails]);

  const updateDetails = async (data) => {
    const updatedDetails = await userService.updateUser({
      userId: user?.$id,
      ...data,
    });
    setUserDetails(updatedDetails);
  };

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
        <form
          onSubmit={handleSubmit(updateDetails)}
          className="flex flex-col justify-center w-full items-center mx-auto"
        >
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            required={true}
            error={errors?.fullName}
            defaultValue={userDetails?.fullName}
            {...register("fullName", { required: true })}
          />
          <Input
            label="Username"
            type="text"
            placeholder="Choose a username"
            required={true}
            error={errors?.userName}
            defaultValue={userDetails?.userName}
            message={message}
            {...register("userName", {
              required: true,
              onChange: async (e) => {
                setMessage(
                  e.target.value === ""
                    ? "username can not be empty"
                    : await userService.isAvailable("userName", e.target.value)
                );
              },
            })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            required={true}
            error={errors?.email}
            defaultValue={userDetails?.email}
            {...register("email", { required: true })}
          />
          <Button type="submit" className="m-4 shadow-md">
            Update Details
          </Button>
        </form>
      </div>
      <div className={`${tab === "Profile pic" ? "flex" : "hidden"}`}>
        <Input
          label="Profile Pic"
          type="file"
          required={true}
          error={errors?.fullName}
          defaultValue={userDetails?.profilePic}
          {...register("profilePic", { required: true })}
        />
      </div>
    </div>
  );
};

export default AccountSettings;
