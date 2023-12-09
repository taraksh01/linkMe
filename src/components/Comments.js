import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useForm } from "react-hook-form";
import postService from "../appwrite/postConfig";
import { useSelector } from "react-redux";

const Comments = ({ postId, data, hideComments }) => {
  const [comments, setComments] = useState(data);
  const [showButtons, setShowButtons] = useState(false);
  const [action, setAction] = useState("comment");
  const [defaultValue, setDefaultValue] = useState("");
  const loggedInUser = useSelector((state) => state?.authSlice?.user?.name);

  const toggleButton = () => {
    setShowButtons(!showButtons);
  };

  const updateComment = (e) => {
    setDefaultValue(
      e.target.parentNode.parentNode.parentNode.textContent.split("⋮")[0]
    );
    setAction("edit");
  };

  const deleteComment = (e) => {
    comments.splice(
      comments.indexOf(
        `${loggedInUser}~${
          e.target.parentNode.parentNode.parentNode.textContent.split("⋮")[0]
        }`
      ),
      1
    );
    postService
      .updatePost({
        postId,
        comments: [...comments],
      })
      .then((res) => setComments(res?.comments));
  };

  useEffect(() => {}, [comments]);

  return (
    <div className="flex flex-col px-2 py-1 bg-purple-100 text-xl rounded-b-lg border-t border-white">
      <Form
        postId={postId}
        action={action}
        defaultValue={defaultValue}
        comments={comments}
        setComments={setComments}
        setAction={setAction}
        setDefaultValue={setDefaultValue}
      />
      {comments?.length > 0 ? (
        <div className={`${hideComments ? "hidden" : "flex"} flex-col gap-1`}>
          {comments?.map((comment, index) => (
            <div key={index} className="px-2">
              <div className="flex justify-between items-start">
                <h3 className="text-gray-800">{comment.split("~")[1]}</h3>
                {comment.split("~")[0] === loggedInUser && (
                  <div>
                    <h3
                      className="text-purple-800 font-semibold cursor-pointer px-2 text-end"
                      onClick={toggleButton}
                    >
                      ⋮
                    </h3>
                    <div
                      className={`${
                        showButtons ? "flex" : "hidden"
                      } flex-col items-end gap-1`}
                    >
                      <Button
                        onClick={(e) => updateComment(e)}
                        bgColor="bg-purple-600"
                        className="px-1 py-0 rounded-md"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={(e) => deleteComment(e)}
                        bgColor="bg-purple-600"
                        className="px-1 py-0 rounded-md"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="p-1">Be the first to comment</h3>
      )}
    </div>
  );
};

const Form = ({
  postId,
  comments,
  setComments,
  action,
  defaultValue = "",
  setAction,
  setDefaultValue,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const loggedInUser = useSelector((state) => state?.authSlice?.user?.name);

  const addComment = ({ comment }) => {
    postService
      .updatePost({
        postId,
        comments: [...comments, `${loggedInUser}~${comment.trim()}`],
      })
      .then((res) => setComments(res?.comments));
    reset();
  };

  const editComment = ({ edit }) => {
    comments.splice(
      comments.indexOf(`${loggedInUser}~${defaultValue}`),
      1,
      `${loggedInUser}~${edit}`
    );
    postService
      .updatePost({
        postId,
        comments: [...comments],
      })
      .then((res) => setComments(res?.comments));
    setDefaultValue("");
    setAction("comment");
    reset();
  };

  const [callFunction, setCallFunction] = useState(
    action === "comment" ? () => addComment : () => editComment
  );

  useEffect(() => {
    setCallFunction(
      action === "comment" ? () => addComment : () => editComment
    );
  }, [action]);

  return (
    <form
      onSubmit={handleSubmit(callFunction)}
      className="flex justify-between items-center gap-2"
    >
      <Input
        type="text"
        defaultValue={defaultValue}
        placeholder="Add a comment (You can't edit or delete this later)"
        className="shadow-none"
        {...register(`${action}`, { required: true })}
      />
      <Button
        bgColor="bg-purple-600"
        className="capitalize"
        color="text-white"
        type="submit"
      >
        {action}
      </Button>
    </form>
  );
};

const Nestedcomment = ({ subComments }) => {
  const subCommnetsArray = subComments?.split(":separator:");

  return (
    <div className="flex flex-col ml-4">
      {subCommnetsArray &&
        subCommnetsArray?.map((subComment, index) => (
          <h3 className="p-1" key={index}>
            {subComment}
          </h3>
        ))}
    </div>
  );
};

export default Comments;
