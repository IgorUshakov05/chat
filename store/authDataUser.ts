import { makeAutoObservable } from "mobx";

class AuthStore {
  login: string = "";
  error: string = "";
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

  setError(newError: string) {
    this.error = newError;
  }
}

const authStore = new AuthStore();
export default authStore;
