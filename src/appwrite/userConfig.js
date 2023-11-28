import { Client, Databases, Query } from "appwrite";
import appConfig from "../appConfig/appConfig";

class UserService {
  client = new Client();
  userDatabase;

  constructor() {
    this.client
      .setEndpoint(appConfig.appwriteApi)
      .setProject(appConfig.appwriteProjectId);

    this.userDatabase = new Databases(this.client);
  }

  async isAvailable(key, value, queries = [Query.equal(`${key}`, value)]) {
    try {
      const available = await this.userDatabase.listDocuments(
        appConfig.appwriteUserDbId,
        appConfig.appwriteUserCollectionId,
        queries
      );
      if (available.total > 0) {
        return `${key} is already taken`;
      } else {
        return `${key} is available`;
      }
    } catch (error) {
      return error.message;
    }
  }
}

const userService = new UserService();

export default userService;
