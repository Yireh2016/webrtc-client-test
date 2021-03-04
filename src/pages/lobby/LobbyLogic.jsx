import React, { useContext } from "react";
import LobbyUi from "./LobbyUi";
import useIsMobile from "../../hooks/useIsMobile";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../wrappers/MobxWrapper";

const LobbyLogic = observer(() => {
  const { username, userList } = useContext(StoreContext);

  const isMobible = useIsMobile();
  return (
    <div>
      <LobbyUi isMobible={isMobible} {...{ user: username, userList }} />
    </div>
  );
});

export default LobbyLogic;
