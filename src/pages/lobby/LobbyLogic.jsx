import React from "react";
import LobbyUi from "./LobbyUi";
import useIsMobile from "../../hooks/useIsMobile";

const LobbyLogic = () => {
  const userList = [{ userId: "test" }, { userId: "test2" }];
  const userId = "jainer";

  const isMobible = useIsMobile();
  return (
    <div>
      <LobbyUi isMobible={isMobible} {...{ userList, userId }} />
    </div>
  );
};

export default LobbyLogic;
