import React from "react";
import LobbyUi from "./LobbyUi";
import useIsMobile from "../../hooks/useIsMobile";
import { getUserList, getUser } from "../../store/selectors";
import { useSelector } from "react-redux";

const LobbyLogic = () => {
  const userList = useSelector(getUserList);
  const user = useSelector(getUser);

  const isMobible = useIsMobile();
  return (
    <div>
      <LobbyUi isMobible={isMobible} {...{ user, userList }} />
    </div>
  );
};

export default LobbyLogic;
