import { makeObservable, observable, action } from "mobx";

export class Store {
  username = "";
  userList = [];
  isLobbyVideoCallModal = false;
  incommingCallCaller = {};

  constructor() {
    makeObservable(this, {
      username: observable,
      userList: observable,
      isLobbyVideoCallModal: observable,
      incommingCallCaller: observable,
      setUsername: action.bound,
      setUserList: action.bound,
      setIsLobbyVideoCallModal: action.bound,
      setIncommingCallCaller: action.bound,
    });
  }

  setUsername(user) {
    this.username = user;
  }

  setIsLobbyVideoCallModal(modalShow) {
    this.isLobbyVideoCallModal = modalShow;
  }

  setIncommingCallCaller(caller) {
    this.incommingCallCaller = caller;
  }

  setUserList(list) {
    this.userList = [...list];
  }
}
