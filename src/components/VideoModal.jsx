import React from "react";
import styled from "styled-components";
import { H2 } from "./Texts";

const VideoModal = ({
  remoteVideo,
  localVideo,
  toogleCamera,
  endCall,
  toogleAudio,
}) => {
  return (
    <VideoModalLayout>
      <H2>video</H2>
      {remoteVideo}
      {localVideo}
      <button onClick={toogleCamera}>camera</button>
      <button onClick={endCall}>end call</button>
      <button onClick={toogleAudio}>audio</button>
    </VideoModalLayout>
  );
};

const VideoModalLayout = styled.div`
  position: fixed;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  background-color: black;
`;

export default VideoModal;
