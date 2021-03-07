import { useEffect } from "react";
import { signalingEvents } from "../constants/signalingEvents";

const useIsOutgoingCallAcceptedByCallee = (
  signaling,
  setIscalleeCallAccepted
) => {
  useEffect(() => {
    signaling &&
      signaling.listen((eventName) => {
        if (eventName.match(signalingEvents.INCOMMING_CALLEE_CALL_ACEPTED)) {
          setIscalleeCallAccepted(true);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);
};

export default useIsOutgoingCallAcceptedByCallee;
