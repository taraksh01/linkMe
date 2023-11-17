import appConfig from "../appConfig/appConfig.js";
import { Client, Account } from "appwrite";

class AuthorizationService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(appConfig.appwriteApi)
      .setProject(appConfig.appwriteProjectId);

    this.account = new Account(this.client);
  }
}

const authService = new AuthorizationService();

export default authService;
