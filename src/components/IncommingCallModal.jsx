import React from "react";
import styled from "styled-components";

const IncommigCallModal = ({
  caller,
  onAcceptIncommingCall,
  onRejectIncommingCall,
}) => {
  return (
    <ModalLayout>
      <Modal>
        <h2>{`${caller} is calling you!!!`} </h2>
        <button onClick={onAcceptIncommingCall}>Accept call</button>
        <button onClick={onRejectIncommingCall}>Reject call</button>
      </Modal>
    </ModalLayout>
  );
};

const Modal = styled.div`
  width: 400px;
  height: 400px;

  background-color: white;
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
