import { makeAutoObservable } from "mobx";

class SecretStore {
  uuidRoom: string = "";
  password: string = "";
  constructor() {
    makeAutoObservable(this);
  }

  setUuidRoom(newUuidRoom: string) {
    this.uuidRoom = newUuidRoom;
  }

  setPassword(newPassword: string) {
    this.password = newPassword;
  }
}

const secretStore = new SecretStore();
export default secretStore;
