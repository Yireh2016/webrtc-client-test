import React from "react";
import VideoModal from "../../components/VideoModal";

const IncommingCallUi = ({
  toogleCamera,
  endCall,
  toogleAudio,
  remoteVideo,
  localVideo,
}) => {
  return (
    <VideoModal
      {...{
        toogleCamera,
        endCall,
        toogleAudio,
        remoteVideo,
        localVideo,
      }}
    />
  );
};

export default IncommingCallUi;
