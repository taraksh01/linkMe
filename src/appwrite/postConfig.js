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

  async getAllPosts() {
    try {
      const allPosts = await this.database.listDocuments(
        appconfig.appwritePostDbId,
        appconfig.appwritePostCollectionId
      );
      if (allPosts) {
        return allPosts;
      }
    } catch (error) {
      return error.message;
    }
  }

  async getPost({ postId }) {
    try {
      const post = await this.database.getDocument(
        appconfig.appwritePostDbId,
        appconfig.appwritePostCollectionId,
        postId
      );
      if (post) {
        return post;
      }
    } catch (error) {
      return error.message;
    }
  }
}

const databaseService = new DatabaseService();

export default databaseService;
