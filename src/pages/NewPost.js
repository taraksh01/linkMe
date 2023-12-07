import { useForm } from "react-hook-form";
import Button from "../components/Button";
import postService from "../appwrite/postConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, serError] = useState("This is a sample error for test");
  const userId = useSelector((state) => state?.authSlice?.user?.$id);
  const navigate = useNavigate();

  const submit = async (data) => {
    const response = await postService.createPost({ ...data, userId });
    if (response?.$id) {
      navigate("/");
    } else {
      serError(
        "Unexpected error occured while creating post. Please try creating post again."
      );
    }
  };

  return (
    <form
      className="max-w-sm mx-auto flex flex-col items-center my-8"
      onSubmit={handleSubmit(submit)}
    >
      <textarea
        className="w-full outline-none border resize-none border-gray-600 rounded-lg text-2xl px-3 py-1 bg-gry-50 text-gray-700 no-scrollbar"
        placeholder="Share something..."
        autoFocus
        rows={5}
        cols={24}
        {...register("post", { required: true })}
      ></textarea>
      <div className="text-red-500 py-2 text-center">{error}</div>
      <Button type="submit" className="m-4">
        Share
      </Button>
    </form>
  );
};
export default NewPost;
