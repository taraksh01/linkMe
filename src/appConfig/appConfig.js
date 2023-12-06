const appConfig = {
  appwriteApi: String(process.env.APPWRITE_API_POINT),
  appwriteProjectId: String(process.env.APPWRITE_PROJECT_ID),
  appwriteUserDbId: String(process.env.APPWRITE_USER_DB_ID),
  appwriteUserCollectionId: String(process.env.APPWRITE_USER_COLLECTION_ID),
  appwritePostDbId: String(process.env.APPWRITE_POST_DB_ID),
  appwritePostCollectionId: String(process.env.APPWRITE_POST_COLLECTION_ID),
  appwritePostData: String(process.env.APPWRITE_POST_DATA),
  appwriteProfilePic: String(process.env.APPWRITE_PROFILE_PIC),
};

export default appConfig;
