import { useEffect, useState } from "react";
import { signalingEvents } from "../constants/signalingEvents";

const peerStatus = {
  AVAILABLE: "idle",
};

const useIncommingCall = ({
  signaling,
  calleeStatus = peerStatus.AVAILABLE,
}) => {
  const [caller, setCaller] = useState();

  useEffect(() => {
    signaling &&
      signaling.listen((eventName, ...args) => {
        if (
          eventName.match(signalingEvents.CALLING) &&
          calleeStatus.match(peerStatus.AVAILABLE)
        ) {
          setCaller(args[0].caller);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);
  return caller;
};

export default useIncommingCall;
