import appconfig from "../appConfig/appConfig";
import { Client, Databases, ID, Query, Storage } from "appwrite";

class PostService {
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

  async getAllPosts(query = []) {
    try {
      const allPosts = await this.database.listDocuments(
        appconfig.appwritePostDbId,
        appconfig.appwritePostCollectionId,
        query
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

  async deletePost(postId) {
    try {
      const post = await this.database.deleteDocument(
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

  async updatePost({ postId, post, likes }) {
    try {
      const data = await this.database.updateDocument(
        appconfig.appwritePostDbId,
        appconfig.appwritePostCollectionId,
        postId,
        { post, likes }
      );
      if (data) {
        return data;
      }
    } catch (error) {
      return error.message;
    }
  }
}

const postService = new PostService();

export default postService;
