import React from "react";
import { H2, P2 } from "./Texts";
import UserChatButton from "./UserChatButton";
import styled from "styled-components";

const ChatPal = ({ user, userList, onUserClick }) => {
  return (
    <div style={{ boxSizing: " border-box" }}>
      <TitleLayout>
        <H2>{`Welcome, ${user}`}</H2>
        <H2
          style={{
            paddingTop: "40px",
            marginBottom: "70px",
          }}
        >
          Select your chat pal.
        </H2>
        {userList && userList?.length < 2 && (
          <P2
            style={{
              paddingTop: "40px",
              marginBottom: "70px",
            }}
          >
            There are no pals for you to chat with yet.
          </P2>
        )}
      </TitleLayout>

      <div>
        {typeof userList !== "string" &&
          userList &&
          userList?.length > 0 &&
          userList
            .filter((_user) => {
              return _user.user_id !== user;
            })
            .map((_user, index) => (
              <div key={index}>
                <UserChatButton {...{ user: _user, index, onUserClick }} />
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
