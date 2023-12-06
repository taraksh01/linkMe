import { useForm } from "react-hook-form";
import Button from "../components/Button";
import postService from "../appwrite/postConfig";
import { useSelector } from "react-redux";

const Post = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userId = useSelector((state) => state?.authSlice?.user?.$id);

  const submit = async (data) => {
    const response = await postService.createPost({ ...data, userId });
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
      <Button type="submit" className="m-4">
        Share
      </Button>
    </form>
  );
};
export default Post;
