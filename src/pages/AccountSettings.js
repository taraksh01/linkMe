import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../appwrite/userConfig";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";

const AccountSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useSelector((state) => state?.authSlice?.user);
  const [userDetails, setUserDetails] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    userService.getUser({ userId: user?.$id }).then((res) => {
      setUserDetails(res);
    });
  }, [user]);

  const updateAccount = async (data) => {
    const updatedAccount = await userService.updateUser({
      userId: user?.$id,
      ...data,
    });
    setUserDetails(updatedAccount);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit(updateAccount)}
        className="flex flex-col justify-center items-center mx-auto"
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
  );
};

export default AccountSettings;
