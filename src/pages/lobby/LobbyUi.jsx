import React from "react";
import styled from "styled-components";
import ChatPal from "../../components/ChatPal";

const LobbyUi = ({ isMobible, userList, userId }) => {
  console.log({ isMobible });
  return (
    <LobbyLayout>
      <LeftAside id="LeftAside">
        <ChatPal userId={userId} userList={userList} />
      </LeftAside>
    </LobbyLayout>
  );
};

const LeftAside = styled.div`
  height: 100vh;
  width: 100vw;
`;

const LobbyLayout = styled.div`
  background-color: ${({ theme }) => theme.palette.background};
  height: 100vh;
  width: 100vw;
`;

export default LobbyUi;
