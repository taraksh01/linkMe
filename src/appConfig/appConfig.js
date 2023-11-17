const appConfig = {
  appwriteApi: String(process.env.APPWRITE_API_POINT),
  appwriteProjectId: String(process.env.APPWRITE_PROJECT_ID),
  appwriteUserDbId: String(process.env.APPWRITE_USER_DB_ID),
  appwriteUserCollectionId: String(process.env.APPWRITE_USER_COLLECTION_ID),
};


export default appConfig;