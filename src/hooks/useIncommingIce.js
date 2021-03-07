import { signalingEvents } from "../constants/signalingEvents";
import { useEffect } from "react";
import addIceCandidate from "../webrtc/addIceCandidate";
import logguer from "../helpers/logguer";

const useIncommingIce = (signaling, peerConnection) => {
  useEffect(() => {
    if (signaling && peerConnection) {
      logguer("listening for incomming ice");
      signaling.listen((eventName, ...args) => {
        switch (eventName) {
          case signalingEvents.INCOMMING_CALLER_ICE:
            addIceCandidate(args[0].callerIce, peerConnection);
            break;
          case signalingEvents.INCOMMING_CALLEE_ICE:
            addIceCandidate(args[0].calleeIce, peerConnection);
            break;

          default:
            break;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling, peerConnection]);
};

export default useIncommingIce;
