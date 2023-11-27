import { useDispatch } from "react-redux";
import authService from "../appwrite/authConfig";
import { logout as sliceLogout } from "../store/features/authSlice";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    authService.logout().then((res) => {
      if (res === "Logged out successfully") {
        localStorage.clear();
        dispatch(sliceLogout());
        navigate("/");
      }
    });
  };

  return <Button onClick={logout}>Log out</Button>;
};

export default LogoutButton;
