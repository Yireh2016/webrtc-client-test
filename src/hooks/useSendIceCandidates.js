import { useEffect } from "react";
import { signalingEvents } from "../constants/signalingEvents";

const useSendIceCandidates = (
  signaling,
  peerConnection,
  caller,
  callee,
  emitter
) => {
  useEffect(() => {
    if (signaling && peerConnection) {
      peerConnection.onicecandidate = ({ candidate }) => {
        candidate &&
          signaling.send(signalingEvents[`SEND_${emitter}_ICE`], {
            callee,
            caller,
            candidate,
          });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling, peerConnection]);
};

export default useSendIceCandidates;
