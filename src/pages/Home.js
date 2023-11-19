import { useSelector } from "react-redux";

const Home = () => {
  const authStatus = useSelector((state) => state.authSlice.status);
  return authStatus === "authorized" ? (
    <h1 className="text-center text-5xl m-2">Create a post</h1>
  ) : (
    <h1 className="text-center text-5xl m-2">Login to create posts</h1>
  );
};

export default Home;
