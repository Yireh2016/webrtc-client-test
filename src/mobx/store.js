import { makeObservable, observable, action } from "mobx";

export class Store {
  username = "";
  userList = [];
  isVideoCallModal = false;

  constructor() {
    makeObservable(this, {
      username: observable,
      userList: observable,
      isVideoCallModal: observable,
      setUsername: action.bound,
      setUserList: action.bound,
      setIsVideoCallModal: action.bound,
    });
  }

  setUsername(user) {
    this.username = user;
  }

  setIsVideoCallModal(modalShow) {
    this.isVideoCallModal = modalShow;
  }

  setUserList(list) {
    this.userList = [...list];
  }
}
