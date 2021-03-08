import React from "react";
import styled from "styled-components";
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
      autoPlay
      playsInline
      id="localVideo"
      ref={localVideoRef}
    ></LocalVideo>
  );

  const remoteVideo = (
    <RemoteVideo
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
        <button onClick={toogleCamera}>camera</button>
        <button onClick={endCall}>end call</button>
        <button onClick={toogleAudio}>audio</button>
      </ControllersLayout>
    </VideoModalLayout>
  );
};

const LocalVideo = styled.video`
  width: 150px;
  height: 150px;
  position: fixed;
  z-index: 1000;
  bottom: 10px;
  right: 10px;
`;
const RemoteVideo = styled.video`
  width: 100%;
  height: 100%;
`;

const ControllersLayout = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100vw;
  bottom: 100px;
`;

const VideoModalLayout = styled.div`
  position: fixed;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  background-color: black;
  padding: 20px;
`;

export default VideoModal;
