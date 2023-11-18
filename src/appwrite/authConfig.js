import appConfig from "../appConfig/appConfig.js";
import { Client, Account, ID } from "appwrite";

class AuthorizationService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(appConfig.appwriteApi)
      .setProject(appConfig.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const newUser = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (newUser) {
        return `Account created successfully`;
      }
    } catch (error) {
      return error.message;
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.account.createEmailSession(email, password);
      if (user) {
        return `Logged in successfully`;
      }
    } catch (error) {
      return error.message;
    }
  }

  async currentUser() {
    try {
      const user = await this.account.get();
      if (user) {
        return user;
      }
    } catch (error) {
      return error.message;
    }
  }

  async logout(sessionId = `current`) {
    try {
      const user = await this.account.deleteSession(sessionId);
      if (user) {
        return `Logged out successfully`;
      }
    } catch (error) {
      return error.message;
    }
  }
}

const authService = new AuthorizationService();

export default authService;
