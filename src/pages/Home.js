import { useSelector } from "react-redux";
import PostCard from "./PostCard";
import databaseService from "../appwrite/postConfig";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const authStatus = useSelector((state) => state.authSlice.status);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    databaseService.getAllPosts().then((res) => setAllPosts(res));
  }, []);
  return authStatus === "authorized" ? (
    <>
      <h1 className="text-center text-5xl m-2">Create a new post</h1>
      <div className="flex flex-wrap mx-auto  bg-zinc-950  max-w-md justify-center">
        {allPosts?.documents?.map((post) => (
          <PostCard key={post.$id}>{post}</PostCard>
        ))}
      </div>
    </>
  ) : (
    <h1 className="text-center text-5xl m-2">Login to create posts</h1>
  );
};

export default Home;
