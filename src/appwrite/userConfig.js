import { Client, Databases, ID, Query } from "appwrite";
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

  async createUser({ fullName, userName, email, userImage }) {
    if (
      (await this.isAvailable(`userName`, userName)) ==
        "userName is available" &&
      (await this.isAvailable(`email`, email)) === `email is available`
    ) {
      try {
        const user = await this.userDatabase.createDocument(
          appConfig.appwriteUserDbId,
          appConfig.appwriteUserCollectionId,
          ID.unique(),
          { fullName, email, userImage, userName }
        );
        if (user) return user;
      } catch (error) {
        return error.message;
      }
    } else {
      return "Unexpected Error While attempting to create account";
    }
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

  async getUser({ userId }) {
    try {
      const user = await this.userDatabase.getDocument(
        appConfig.appwriteUserDbId,
        appConfig.appwriteUserCollectionId,
        userId
      );
      if (user) {
        return user;
      }
    } catch (error) {
      return error.message;
    }
  }

  async updateUser({ userId, fullName, userName, email, userImage }) {
    try {
      const user = await this.userDatabase.updateDocument(
        appConfig.appwriteUserDbId,
        appConfig.appwriteUserCollectionId,
        userId,
        { fullName, userName, email, userImage }
      );
      if (user) {
        return user;
      } else {
        return "Unexpected Error occured While attempting to update account";
      }
    } catch (error) {
      return error.message;
    }
  }

  async deleteUser({ userId }) {
    try {
      const user = await this.userDatabase.deleteDocument(
        appConfig.appwriteUserDbId,
        appConfig.appwriteUserCollectionId,
        userId
      );
      if (user) {
        return user;
      } else {
        return "Unexpected Error occured While attempting to delete account";
      }
    } catch (error) {
      return error.message;
    }
  }
}

const userService = new UserService();

export default userService;
