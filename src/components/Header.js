import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const authStatus = useSelector((state) => state.authSlice.status);
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", url: "/", active: true },
    { name: "Post", url: "/post", active: authStatus === "authorized" },
    { name: "Login", url: "/login", active: authStatus !== "authorized" },
    {
      name: "Create Account",
      url: "/register",
      active: authStatus !== "authorized",
    },
  ];

  return (
    <header className="flex justify-between items-center shadow-md p-2 w-screen">
      <Link to={"/"}>
        <Logo>LinkMe</Logo>
      </Link>
      <div className="flex">
        <div className="">
          {navItems?.map(
            (item) =>
              item.active && (
                <Button key={item.name} onClick={() => navigate(item.url)}>
                  {item.name}
                </Button>
              )
          )}
        </div>
        {authStatus === "authorized" && <LogoutButton />}
      </div>
    </header>
  );
};

export default Header;
