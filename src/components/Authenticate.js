import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Authenticate = ({ children }) => {
  const url = window.location.href;
  const { user } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  useEffect(() => {
    !user && (url.includes("login") || url.includes("register"))
      ? ""
      : navigate("/login");
    user && (url.includes("login") || url.includes("register"))
      ? navigate("/")
      : "";
  }, [user]);

  return <>{children}</>;
};

export default Authenticate;
