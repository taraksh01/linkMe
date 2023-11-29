import { Avatars, Client } from "appwrite";
import appConfig from "../appConfig/appConfig";

class AvatarService {
  client = new Client();
  avatar;

  constructor() {
    this.client
      .setEndpoint(appConfig.appwriteApi)
      .setProject(appConfig.appwriteProjectId);

    this.avatar = new Avatars(this.client);
  }
}

const avatarService = new AvatarService();

export default avatarService;
