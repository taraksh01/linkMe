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
}

const userStorage = new UserStorage();

export default userStorage;
