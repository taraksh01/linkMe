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

  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data) => {
    try {
      const res = await authService.login(data);
      if (res === "Logged in successfully") {
        navigate(data);
        dispatch(sliceLogin(data));
      } else {
        setLoginError(res);
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
        Login to your account or{" "}
        <Link
          to={"/register"}
          className="transition-all duration-1000 hover:underline text-green-500"
        >
          create now
        </Link>
      </h1>
      {loginError && (
        <p className="text-red-500 text-sm my-1 text-center">{loginError}</p>
      )}
      <form
        onSubmit={handleSubmit(login)}
        className="flex flex-col justify-center items-center w-full mx-auto"
      >
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
          Log in
        </Button>
      </form>
    </div>
  );
};

export default Login;
