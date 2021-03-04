import React from "react";
import { H2 } from "./Texts";
import UserChatButton from "./UserChatButton";
import styled from "styled-components";

const ChatPal = ({ userId, userList }) => {
  return (
    <div style={{ boxSizing: " border-box" }}>
      <TitleLayout>
        <H2>{`Welcome, ${userId}`}</H2>
        <H2
          style={{
            paddingTop: "40px",
            marginBottom: "70px",
          }}
        >
          Select your chat pal.
        </H2>
      </TitleLayout>

      <div>
        {userList.length > 0 &&
          userList.map((user, index) => (
            <div key={index}>
              <UserChatButton {...{ user, index }} />
            </div>
          ))}
      </div>
    </div>
  );
};

const TitleLayout = styled.div`
  padding: 45px 35px 0 35px;
`;

export default ChatPal;
