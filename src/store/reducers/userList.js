import { SET_USER_LIST } from "../constants";

const initialState = [];

const setUserList = ({ payload }) => payload;

const userList = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LIST: {
      return setUserList(action);
    }
    default:
      return state;
  }
};

export default userList;
