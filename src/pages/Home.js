import { useSelector } from "react-redux";
import Post from "./Post";
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
      <div className="flex flex-wrap mx-auto max-w-sm bg-zinc-950 justify-center">
        {allPosts?.documents?.map((post) => (
          <Post key={post.$id}>{post}</Post>
        ))}
      </div>
    </>
  ) : (
    <h1 className="text-center text-5xl m-2">Login to create posts</h1>
  );
};

export default Home;
