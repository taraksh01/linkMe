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

  getUserInitial(name, width = 50, height = 50) {
    return this.avatar.getInitials(name, width, height);
  }

  getQRCode(text, size = 400) {
    return this.avatar.getQR(text, size);
  }

  getImage(url, width = 400, height = 400) {
    return this.avatar.getImage(url, width, height);
  }

  getCountryFlag(countryCode, width = 50, height = 50) {
    return this.avatar.getFlag(countryCode, width, height);
  }

  getFavicon(url) {
    return this.avatar.getFavicon(url);
  }
}

const avatarService = new AvatarService();

export default avatarService;
