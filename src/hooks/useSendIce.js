import { useEffect } from "react";
import { signalingEvents } from "../constants/signalingEvents";

const useSendIce = (signaling, peerConnection, callee, caller, emitter) => {
  useEffect(() => {
    if (signaling && peerConnection) {
      peerConnection.onicecandidate = ({ candidate }) => {
        candidate &&
          signaling.send(signalingEvents[`SEND_${emitter}_ICE`], {
            callee,
            callerIce: candidate,
            caller,
          });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling, peerConnection]);
};

export default useSendIce;
