import appConfig from "../appConfig/appConfig";
import { Client, ID, Storage } from "appwrite";

class UserStorage {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(appConfig.appwriteApi)
      .setProject(appConfig.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  async createFile(file) {
    try {
      const response = await this.storage.createFile(
        appConfig.appwriteUserImage,
        ID.unique(),
        file
      );
      if (response) {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  }

  async getFile(fileid) {
    try {
      const response = await this.storage.getFile(
        appConfig.appwriteUserImage,
        fileid
      );
      if (response) {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  }

  async deleteFile(fileId) {
    try {
      const response = await this.storage.deleteFile(
        appConfig.appwriteUserImage,
        fileId
      );
      if (response) {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  }
}

const userStorage = new UserStorage();

export default userStorage;
