import React from "react";
import { createContext } from "react";
import { Store } from "../mobx/store";

export const StoreContext = createContext();

const MobxWrapper = ({ children }) => {
  return (
    <StoreContext.Provider value={new Store()}>
      {children}
    </StoreContext.Provider>
  );
};

export default MobxWrapper;
