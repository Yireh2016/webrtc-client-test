import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { H2 } from "./Texts";

const VideoModal = ({
  remoteVideoRef,
  localVideoRef,
  toogleCamera,
  endCall,
  toogleAudio,
}) => {
  const localVideo = (
    <LocalVideo
      data-id="localVideo"
      autoPlay
      playsInline
      id="localVideo"
      ref={localVideoRef}
    ></LocalVideo>
  );

  const remoteVideo = (
    <RemoteVideo
      data-id="remoteVideo"
      autoPlay
      playsInline
      id="remoteVideo"
      ref={remoteVideoRef}
    ></RemoteVideo>
  );

  return (
    <VideoModalLayout>
      <H2>video</H2>
      {remoteVideo}
      {localVideo}
      <ControllersLayout>
        <Button onClick={toogleCamera}>camera</Button>
        <Button onClick={endCall}>end call</Button>
        <Button onClick={toogleAudio}>audio</Button>
      </ControllersLayout>
    </VideoModalLayout>
  );
};

const LocalVideo = styled.video`
  width: 150px;
  height: 150px;
  position: fixed;
  z-index: 1000;
  bottom: 315px;
  right: 10px;
`;
const RemoteVideo = styled.video`
  width: 100%;

  @media (min-width: 600px) {
    height: 100%;
  }
`;

const ControllersLayout = styled.div`
  left: 0;
  position: fixed;
  z-index: 1000;
  bottom: 50px;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 15px;

  @media (min-width: 600px) {
    display: block;
    bottom: 0;

    & button {
      margin-left: 15px;
      margin-top: 0;
    }
  }

  & button {
    margin-top: 15px;
  }
`;

const VideoModalLayout = styled.div`
  position: fixed;
  z-index: 500;
  width: 100%;
  height: 100vh;
  background-color: black;
  padding: 20px;
  box-sizing: border-box;
`;

export default VideoModal;
