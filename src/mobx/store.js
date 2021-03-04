import { makeObservable, observable, action } from "mobx";

export class Store {
  username = "";
  userList = [];

  constructor() {
    makeObservable(this, {
      username: observable,
      userList: observable,
      setUsername: action.bound,
      setUserList: action.bound,
    });
  }

  setUsername(user) {
    console.log({ this_: this });
    this.username = user;
  }

  setUserList(list) {
    this.userList = [...list];
  }
}
