import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { H2 } from "./Texts";

const IncommigCallModal = ({
  caller,
  onAcceptIncommingCall,
  onRejectIncommingCall,
}) => {
  return (
    <ModalLayout data-id="ModalLayout">
      <Modal>
        <H2>{`${caller} is calling you!!!`} </H2>
        <ControlContainer>
          <Button onClick={onAcceptIncommingCall}>Accept call</Button>
          <RejectCallContainer>
            <Button onClick={onRejectIncommingCall}>Reject call</Button>
          </RejectCallContainer>
        </ControlContainer>
      </Modal>
    </ModalLayout>
  );
};

const RejectCallContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  @media (min-width: 600px) {
    margin: 0;
  }
`;

const ControlContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
const Modal = styled.div`
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-around;

  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;

  background-color: ${({ theme }) => theme.palette.background};

  width: calc(100% - 30px);
  height: 400px;

  @media (min-width: 600px) {
    width: 500px;
  }
`;

const ModalLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default IncommigCallModal;
