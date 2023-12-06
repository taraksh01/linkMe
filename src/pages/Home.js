import { useSelector } from "react-redux";
import PostCard from "./PostCard";
import databaseService from "../appwrite/postConfig";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const authStatus = useSelector((state) => state.authSlice.status);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    databaseService.getAllPosts().then((res) => setAllPosts(res));
  }, []);
  return authStatus === "authorized" ? (
    <div className="flex flex-wrap mx-auto my-2 max-w-2xl justify-center">
      {allPosts?.documents?.map((post) => (
        <Link to={`/post/${post.$id}`} key={post.$id} className="border w-full">
          <PostCard>{post}</PostCard>
        </Link>
      ))}
    </div>
  ) : (
    <h1 className="text-center text-5xl m-2">Login to create posts</h1>
  );
};

export default Home;
