import React from "react";
import VideoModal from "../../components/VideoModal";

const IncommingCallUi = ({
  toogleCamera,
  endCall,
  toogleAudio,
  remoteVideoRef,
  localVideoRef,
}) => {
  return (
    <VideoModal
      {...{
        toogleCamera,
        endCall,
        toogleAudio,
        remoteVideoRef,
        localVideoRef,
      }}
    />
  );
};

export default IncommingCallUi;
