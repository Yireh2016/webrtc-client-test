import { SET_USER } from "../constants";

const initialState = "";

const setUser = ({ payload }) => payload;

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return setUser(action);
    }
    default:
      return state;
  }
};

export default user;
