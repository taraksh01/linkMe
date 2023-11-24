import appconfig from "../appConfig/appConfig";
import { Client, Databases, Storage } from "appwrite";

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
}

const databaseService = new DatabaseService();

export default databaseService;
