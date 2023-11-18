import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/authConfig";
import {
  login as sliceLogin,
  logout as sliceLogout,
} from "../store/features/authSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createAccount = async (data) => {
    try {
      const res = await authService.createAccount(data);
      if (res === "Account created successfully") {
        navigate("/");
        const currentUser = await authService.currentUser();
        dispatch(sliceLogin(currentUser));
      } else {
        setRegisterError(res);
        dispatch(sliceLogout());
      }
    } catch (error) {
      setRegisterError(sliceLogout());
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
          label="Name"
          type="text"
          placeholder="Enter your name"
          required={true}
          error={errors.name}
          {...register("name", { required: true })}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          required={true}
          error={errors.name}
          {...register("email", { required: true })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Choose a strong password"
          required={true}
          error={errors.name}
          {...register("password", { required: true })}
        />
        <Button type="submit" className="m-4 shadow-md">
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default Login;
