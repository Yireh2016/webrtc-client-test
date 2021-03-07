import { signalingEvents } from "../constants/signalingEvents";
import { useEffect } from "react";
import addIceCandidate from "../webrtc/addIceCandidate";
import logguer from "../helpers/logguer";

const useAddRemoteIceCandidates = (signaling, peerConnection) => {
  useEffect(() => {
    if (signaling && peerConnection) {
      logguer("listening for incomming ice");
      signaling.listen((eventName, ...args) => {
        switch (eventName) {
          case signalingEvents.INCOMMING_CALLER_ICE:
            args[0].callerIce.forEach((candidate) => {
              addIceCandidate(candidate, peerConnection);
            });
            break;
          case signalingEvents.INCOMMING_CALLEE_ICE:
            args[0].calleeIce.forEach((candidate) => {
              addIceCandidate(candidate, peerConnection);
            });
            break;

          default:
            break;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling, peerConnection]);
};

export default useAddRemoteIceCandidates;
