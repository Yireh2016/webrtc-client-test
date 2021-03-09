import React from "react";
import { createContext } from "react";
import PeerConnectionContainer from "../classes/PeerConnectionContainer";

export const PeerConnectionContext = createContext();

const PeerConnectionWrapper = ({ children }) => {
  return (
    <PeerConnectionContext.Provider value={new PeerConnectionContainer()}>
      {children}
    </PeerConnectionContext.Provider>
  );
};

export default PeerConnectionWrapper;
