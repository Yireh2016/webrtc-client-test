import { useEffect, useState } from "react";
import { signalingEvents } from "../constants/signalingEvents";

const useIncommingCallerOffer = (signaling) => {
  const [callerOffer, setCallerOffer] = useState();
  useEffect(() => {
    signaling &&
      signaling.listen((eventName, ...args) => {
        if (eventName.match(signalingEvents.INCOMMING_CALLER_OFFER)) {
          setCallerOffer(args[0].offer);
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);

  return callerOffer;
};

export default useIncommingCallerOffer;
