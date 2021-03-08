import { signalingEvents } from "../constants/signalingEvents";
import { useEffect } from "react";
import addIceCandidate from "../webrtc/addIceCandidate";

const useAddRemoteIceCandidates = (signaling, peerConnection) => {
  useEffect(() => {
    if (signaling && peerConnection) {
      signaling.listen((eventName, ...args) => {
        switch (eventName) {
          case signalingEvents.INCOMMING_CALLER_ICE: {
            const { candidate } = args[0];

            addIceCandidate(candidate, peerConnection);
            break;
          }
          case signalingEvents.INCOMMING_CALLEE_ICE: {
            const { candidate } = args[0];

            addIceCandidate(candidate, peerConnection);
            break;
          }

          default:
            break;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling, peerConnection]);
};

export default useAddRemoteIceCandidates;
