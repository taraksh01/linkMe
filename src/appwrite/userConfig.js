import { Client, Databases } from "appwrite";
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
}

const userService = new UserService();

export default userService;
