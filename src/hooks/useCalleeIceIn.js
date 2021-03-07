import { signalingEvents } from "../constants/signalingEvents";
import { useEffect } from "react";

const useCalleeIceIn = ({ signaling, setIsLobbyVideoCallModal, endCall }) => {
  useEffect(() => {
    if (signaling) {
      signaling.listen((eventName, ...args) => {
        switch (eventName) {
          case signalingEvents.CALLEE_CALL_REJECTED:
            setIsLobbyVideoCallModal(false);
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

export default useCalleeIceIn;
