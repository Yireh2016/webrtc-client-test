import { combineReducers } from "redux";

import user from "./user";
import userList from "./userList";
const rootReducerCreator = () =>
  combineReducers({
    user,
    userList,
  });

export default rootReducerCreator;
