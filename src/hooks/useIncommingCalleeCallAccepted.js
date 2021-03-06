import { useEffect, useState } from "react";
import { signalingEvents } from "../constants/signalingEvents";

const useIncommingCalleeCallAccepted = ({ signaling }) => {
  const [iscalleeCallAccepted, setIscalleeCallAccepted] = useState(false);
  useEffect(() => {
    signaling &&
      signaling.listen((eventName) => {
        if (eventName.match(signalingEvents.INCOMMING_CALLEE_CALL_ACEPTED)) {
          setIscalleeCallAccepted(true);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);
  return iscalleeCallAccepted;
};

export default useIncommingCalleeCallAccepted;
