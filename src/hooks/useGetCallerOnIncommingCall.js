import { useState, useEffect } from "react";
import { signalingEvents } from "../constants/signalingEvents";

const useGetCallerOnIncommingCall = (signaling) => {
  const [incommingCaller, setIncommingCaller] = useState();
  useEffect(() => {
    signaling &&
      signaling.listen((eventName, ...args) => {
        switch (eventName) {
          case signalingEvents.INCOMMING_CALLER_CALLING:
            setIncommingCaller(args[0].caller);
            break;

          default:
            break;
        }
      });
  }, [signaling]);
  return incommingCaller;
};

export default useGetCallerOnIncommingCall;
