import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/authConfig";
import userService from "../appwrite/userConfig";
import {
  login as sliceLogin,
  logout as sliceLogout,
} from "../store/features/authSlice";
import avatarService from "../appwrite/avatarConfig";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState(null);

  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createAccount = async (data) => {
    if (data?.userName?.includes(" ")) {
      setMessage("Username cannot contain spaces");
      return;
    }
    try {
      const res = await authService.createAccount(data);
      if (res === "Account created successfully") {
        const currentUser = await authService.currentUser();
        dispatch(sliceLogin(currentUser));
        localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
        const profilePic = avatarService.getUserInitial(currentUser.name).href;
        await userService.createUser({
          userId: currentUser.$id,
          ...data,
          profilePic,
        });
        navigate("/");
        window.location.reload();
      } else {
        setRegisterError(res);
        dispatch(sliceLogout());
      }
    } catch (error) {
      dispatch(sliceLogout());
    }
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-sm mx-auto py-10 rounded-lg">
      <div className="">
        <Link to={"/"}>
          <Logo>LinkMe</Logo>
        </Link>
      </div>
      <h1 className="text-sm text-gray-700">
        Create a new account or{" "}
        <Link to={"/login"} className="hover:underline text-green-500">
          login
        </Link>
      </h1>
      {registerError && (
        <p className="text-red-500 text-sm my-1 text-center">{registerError}</p>
      )}
      <form
        onSubmit={handleSubmit(createAccount)}
        className="flex flex-col justify-center items-center w-full mx-auto"
      >
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          required={true}
          error={errors.fullName}
          {...register("fullName", { required: true })}
        />
        <Input
          label="Username"
          type="text"
          placeholder="Choose a username"
          required={true}
          error={errors.userName}
          message={message}
          {...register("userName", {
            required: true,
            onChange: async (e) => {
              setMessage(
                e?.target?.value === ""
                  ? "username cannot be empty"
                  : e?.target?.value.includes(" ")
                  ? "username cannot contain space"
                  : await userService.isAvailable("userName", e?.target?.value)
              );
            },
          })}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          required={true}
          error={errors.email}
          {...register("email", { required: true })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Choose a strong password"
          required={true}
          error={errors.password}
          {...register("password", { required: true })}
        />
        <Button type="submit" className="m-4 shadow-md">
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default Signup;
