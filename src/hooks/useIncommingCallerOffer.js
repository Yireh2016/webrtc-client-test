import { useEffect, useState } from "react";
import { signalingEvents } from "../constants/signalingEvents";
import peerConnectionHandler from "../webrtc/peerConnectionHandler";
import insertStreamOnVideo from "../webrtc/insertStreamOnVideo";

const useIncommingCallerOffer = ({
  signaling,
  localVideoRef,
  setCalleePeerConnection,
}) => {
  const [callerOffer, setCallerOffer] = useState();
  useEffect(() => {
    signaling &&
      signaling.listen((eventName, ...args) => {
        if (eventName.match(signalingEvents.INCOMMING_CALLER_OFFER)) {
          insertStreamOnVideo(localVideoRef.current, (stream) => {
            peerConnectionHandler(stream, signaling, setCalleePeerConnection);
          });

          setCallerOffer(args[0].offer);
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);

  return callerOffer;
};

export default useIncommingCallerOffer;
