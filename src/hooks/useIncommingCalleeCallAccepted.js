import { useEffect, useState } from "react";
import { signalingEvents } from "../constants/signalingEvents";
import peerConnectionHandler from "../webrtc/peerConnectionHandler";
import insertStreamOnVideo from "../webrtc/insertStreamOnVideo";

const useIncommingCalleeCallAccepted = ({
  signaling,
  localVideoRef,
  setCallerPeerConnection,
}) => {
  useEffect(() => {
    signaling &&
      signaling.listen((eventName) => {
        if (eventName.match(signalingEvents.INCOMMING_CALLEE_CALL_ACEPTED)) {
          insertStreamOnVideo(localVideoRef.current, (stream) => {
            peerConnectionHandler(stream, signaling, setCallerPeerConnection);
          });
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);
};

export default useIncommingCalleeCallAccepted;
