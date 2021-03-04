import rootReducerCreator from "./reducers/root";
import { createStore } from "redux";

const fn = () => {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : fn;

const rootReducer = rootReducerCreator();

const store =
  process.env.NODE_ENV === "development"
    ? createStore(rootReducer, composeEnhancer()) //devtools para desarrollo
    : createStore(rootReducer);

export default store;
