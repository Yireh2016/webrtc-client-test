import { SET_USER, SET_USER_LIST } from "../constants";
import store from "../index";

const makeActionCreator = ({ type, payload }) =>
  store.dispatch({ type, payload });

export const setUser = (user) =>
  makeActionCreator({
    type: SET_USER,
    payload: user,
  });

export const setUserList = (userList) =>
  makeActionCreator({
    type: SET_USER_LIST,
    payload: userList,
  });
