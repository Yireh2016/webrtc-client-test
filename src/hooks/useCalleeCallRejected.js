import { signalingEvents } from "../constants/signalingEvents";
import { useEffect } from "react";

const useCalleeCallRejected = ({ signaling, setIsVideoCallModal, endCall }) => {
  useEffect(() => {
    if (signaling) {
      signaling.listen((eventName, ...args) => {
        switch (eventName) {
          case signalingEvents.CALLEE_CALL_REJECTED:
            console.log("CALLEE_CALL_REJECTED", { args });
            setIsVideoCallModal(false);
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

export default useCalleeCallRejected;
