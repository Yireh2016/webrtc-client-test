import React from "react";
import { P2 } from "./Texts";
import styled from "styled-components";

const UserChatButton = ({ user, index }) => {
  return (
    <UserLayout>
      <UserContainer {...{ isMarginTop: index }}>
        <P2>{user.userId}</P2>
      </UserContainer>
    </UserLayout>
  );
};

const UserLayout = styled.div`
  padding: 20px 50px 20px 50px;
`;

const UserContainer = styled.div`
  position: relative;
  ::after {
    content: "";
    border-bottom: 1px solid white;
    position: absolute;
    bottom: -19px;
    left: 20px;
    width: 72vw;
  }
`;

export default UserChatButton;
