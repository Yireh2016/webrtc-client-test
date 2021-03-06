import { signalingEvents } from "../constants/signalingEvents";
import { useEffect } from "react";
import addIceCandidateCandidate from "../webrtc/addIceCandidate";

const useIncommingIce = ({ signaling, peerConnection }) => {
  useEffect(() => {
    if (signaling) {
      signaling.listen((eventName, ...args) => {
        switch (eventName) {
          case signalingEvents.INCOMMING_CALLER_ICE:
            console.log("INCOMMING_CALLER_ICE", { args });
            addIceCandidateCandidate(args[0].callerIce, peerConnection);
            break;
          case signalingEvents.INCOMMING_CALLEE_ICE:
            console.log("INCOMMING_CALLEE_ICE", { args });
            addIceCandidateCandidate(args[0].calleeIce, peerConnection);
            break;

          default:
            break;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);
};

export default useIncommingIce;
