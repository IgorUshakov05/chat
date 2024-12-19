import { makeAutoObservable } from "mobx";

class AuthStore {
  login: string = "";
  error: string = "";
  myID: string = "";
  password: string = "";
  constructor() {
    makeAutoObservable(this);
  }

  setLogin(newLogin: string) {
    this.login = newLogin;
  }

  setPassword(newPassword: string) {
    this.password = newPassword;
  }
  setMyId(newMyId: string) {
    this.myID = newMyId;
  }
  setError(newError: string) {
    this.error = newError;
  }
}

const authStore = new AuthStore();
export default authStore;
