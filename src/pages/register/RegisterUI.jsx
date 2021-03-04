import React from "react";
import styled from "styled-components";
import { H2 } from "../../components/Texts";

const RegisterUI = ({
  setUserId,
  userId,
  onDone,
  userList,
  webSocketId,
  callOut,
}) => {
  return (
    <CenteredLayout id="CenteredLayout">
      <FormLayout id="formlayout">
        <H2>Insert an username to start the adventure</H2>

        <div>
          <InputText
            type="text"
            onChange={({ target }) => setUserId(target.value)}
            value={userId}
          />
        </div>
        <div>
          <Button onClick={() => onDone(userId)}>Done</Button>
        </div>
      </FormLayout>
      <div>
        {userList.length > 0 &&
          userList.map(({ user_id }) => {
            return (
              <div key={user_id}>
                {webSocketId === user_id ? null : (
                  <h2 onClick={() => callOut(user_id)}>{user_id}</h2>
                )}
              </div>
            );
          })}
      </div>
    </CenteredLayout>
  );
};

const Button = styled.button`
  background-color: ${({ theme }) => theme.palette.button};
  color: ${({ theme }) => theme.palette.text};
  font-weight: bold;
  padding: 12px 0;
  min-width: 212px;
  border: none;
  border-radius: 8px;

  :focus {
    outline: none;
  }

  :active {
    background-color: transparent;
  }

  :hover {
    cursor: pointer;
  }
`;

const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 360px;
  justify-content: space-between;
  align-items: center;
`;

const InputText = styled.input`
  min-width: 220px;
  width: 295px;
  height: 30px;
  border-radius: 8px;
  padding: 0 8px;
  font-size: 18px;

  :focus {
    outline: none !important;
  }
`;

const CenteredLayout = styled.div`
  background-color: ${({ theme }) => theme.palette.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 30px;
`;

export default RegisterUI;
