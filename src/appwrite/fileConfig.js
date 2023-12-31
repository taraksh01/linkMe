import appConfig from "../appConfig/appConfig";
import { Client, ID, Storage } from "appwrite";

class FileService {
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
        appConfig.appwriteProfilePic,
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

  async getFile(fileId) {
    try {
      const response = await this.storage.getFile(
        appConfig.appwriteProfilePic,
        fileId
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
        appConfig.appwriteProfilePic,
        fileId
      );
      if (response) {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  }

  previewFile(fileId) {
    try {
      const response = this.storage.getFilePreview(
        appConfig.appwriteProfilePic,
        fileId
      );
      if (response) {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  }

  viewFile(fileId) {
    try {
      const response = this.storage.getFileView(
        appConfig.appwriteProfilePic,
        fileId
      );
      if (response) {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  }

  downloadFile(fileId) {
    try {
      const response = this.storage.getFileDownload(
        appConfig.appwriteProfilePic,
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

const fileService = new FileService();

export default fileService;
