const appConfig = {
  appwriteApi: String(process.env.APPWRITE_API_POINT),
  appwriteProjectId: String(process.env.APPWRITE_PROJECT_ID),
  appwriteUserDbId: String(process.env.APPWRITE_USER_DB_ID),
  appwriteUserCollectionId: String(process.env.APPWRITE_USER_COLLECTION_ID),
  appwritePostDbId: String(process.env.APPWRITE_POST_DB_ID),
  appwritePostCollectionId: String(process.env.APPWRITE_POST_COLLECTION_ID),
  appwritePostDataId: String(process.env.APPWRITE_POST_DATA_ID),
  appwriteUserImage: String(process.env.APPWRITE_USER_IMAGE),
};

export default appConfig;
