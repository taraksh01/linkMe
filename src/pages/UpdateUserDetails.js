import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import userService from "../appwrite/userConfig";

const UpdateUserDetails = ({ userDetails, setUserDetails, userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState(null);

  const updateDetails = async (data) => {
    const updatedDetails = await userService.updateUser({
      userId,
      ...data,
    });
    setUserDetails(updatedDetails);
    window.location.reload();
  };

  return (
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
              e.target.value === `${userDetails?.userName}`
                ? ""
                : e.target.value === ""
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
  );
};

export default UpdateUserDetails;
