import { signalingEvents } from "../constants/signalingEvents";
import { useEffect } from "react";

const useCallEnd = (signaling, endCall) => {
  useEffect(() => {
    if (signaling) {
      signaling.listen((eventName) => {
        switch (eventName) {
          case signalingEvents.INCOMMING_CALLEE_END_CALL:
            endCall();
            break;
          case signalingEvents.INCOMMING_CALLER_END_CALL:
            endCall();
            break;

          default:
            break;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);
};

export default useCallEnd;
