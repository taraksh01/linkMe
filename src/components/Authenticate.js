import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Authenticate = ({ children }) => {
  const url = window.location.href;
  const { user } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && (url.includes("login") || url.includes("register"))) {
      navigate("/");
    }
    if (!user && !(url.includes("/login") || url.includes("/register"))) {
      navigate("/login");
    }
  }, [user]);

  return <>{children}</>;
};

export default Authenticate;
