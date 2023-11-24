import appconfig from "../appConfig/appConfig";
import { Client, Databases, ID, Storage } from "appwrite";

class DatabaseService {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client
      .setEndpoint(appconfig.appwriteApi)
      .setProject(appconfig.appwriteProjectId);

    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ post, userId }) {
    try {
      const data = await this.database.createDocument(
        appconfig.appwritePostDbId,
        appconfig.appwritePostCollectionId,
        ID.unique(),
        { post, userId }
      );
      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  }
}

const databaseService = new DatabaseService();

export default databaseService;
