import React from "react";
import styled from "styled-components";
import ChatPal from "../../components/ChatPal";
import VideoModal from "../../components/VideoModal";
import IncommigCallModal from "../../components/IncommingCallModal";

const LobbyUi = ({
  toogleCamera,
  endCall,
  toogleAudio,
  isMobible,
  remoteVideoRef,
  localVideoRef,
  lobbyVideo = null,
  userList,
  user,
  isLobbyVideoCallModal,
  onUserClick,
  isIncommigCallModal,
  onAcceptIncommingCall,
  onRejectIncommingCall,
  caller,
}) => {
  return (
    <LobbyLayout>
      {isIncommigCallModal && (
        <IncommigCallModal
          caller={caller}
          onAcceptIncommingCall={onAcceptIncommingCall}
          onRejectIncommingCall={onRejectIncommingCall}
        />
      )}
      {isLobbyVideoCallModal && (
        <VideoModal
          {...{
            toogleCamera,
            endCall,
            toogleAudio,
            remoteVideoRef,
            localVideoRef,
          }}
        />
      )}
      <LeftAside id="LeftAside">
        <ChatPal user={user} userList={userList} onUserClick={onUserClick} />
        {lobbyVideo}
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
