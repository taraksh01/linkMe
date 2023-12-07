import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import fileService from "../appwrite/fileConfig";
import { useState } from "react";
import userService from "../appwrite/userConfig";

const UpdateProfilePic = ({ userDetails, setUserDetails, userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [profilePic, setProfilePic] = useState(null);

  const previewPic = async (data) => {
    if (userDetails?.profilePic?.length > 0) {
      const res = await fileService.createFile(data?.profilePic[0]);
      setProfilePic(res?.$id);
    }
  };

  const updatePic = async () => {
    const res = await userService.updateUser({
      userId,
      ...userDetails,
      profilePic,
    });
    console.log(res);
    setUserDetails(res);
    window.location.reload();
  };

  const deletePic = async () => {
    await fileService.deleteFile(profilePic);
    window.location.reload();
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(previewPic)}
        className="flex w-full mx-auto justify-around items-center"
      >
        <Input
          type="file"
          required={true}
          error={errors?.fullName}
          defaultValue={userDetails?.profilePic}
          {...register("profilePic", { required: true })}
        />
        <Button type="submit" className="m-4 shadow-md">
          Preview
        </Button>
      </form>
      <div className="flex w-full gap-1">
        <div className="w-1/2 text-center">
          <p className="text-xl font-semibold">Current Pic</p>
          <img
            src={fileService.viewFile(userDetails?.profilePic)}
            alt=""
            className="p-1 rounded-2xl"
          />
        </div>
        <div className="w-1/2 text-center">
          <p className="text-xl font-semibold">Preview Pic</p>
          {profilePic && (
            <img
              src={fileService.viewFile(profilePic)}
              alt=""
              className="p-1 rounded-2xl"
            />
          )}
        </div>
      </div>
      <div className="flex justify-around items-center">
        <Button
          type="submit"
          onClick={deletePic}
          className="m-4 shadow-md text-center hover:bg-purple-800"
        >
          Don't Update
        </Button>
        <Button
          type="submit"
          onClick={updatePic}
          className="m-4 shadow-md text-center hover:bg-purple-800"
        >
          Update Pic
        </Button>
      </div>
    </div>
  );
};

export default UpdateProfilePic;
