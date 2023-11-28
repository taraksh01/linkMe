const Post = (posts) => {
  const {
    $collectionId,
    $createdAt,
    $databaseId,
    $id,
    $permissions,
    $updatedAt,
    post,
    userId,
  } = posts.children;
  return (
    <div className="m-1 rounded-lg bg-gray-100 p-2 w-full mx-auto">
      <div className="flex">
        <div className="rounded-full w-12 h-12 bg-black"></div>
        <div className="flex flex-col ml-2 text-sm justify-center">
          <div className="bg-green-100">@{userId}</div>
          <div className="">{$createdAt.split("T").join(",")}</div>
        </div>
        <div className="px-2 self-start ml-auto text-2xl">⋮</div>
      </div>
      <div className="text-2xl text-justify my-1">{post}</div>
    </div>
  );
};

export default Post;
