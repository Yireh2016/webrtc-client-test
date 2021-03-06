import { useEffect } from "react";
import { signalingEvents } from "../constants/signalingEvents";

const useIncommingCalleeAnswer = (signaling, callerPeerConnection) => {
  useEffect(() => {
    signaling &&
      callerPeerConnection &&
      signaling.listen((eventName, ...args) => {
        if (eventName.match(signalingEvents.INCOMMING_CALLEE_ANSWER)) {
          const { answer } = args[0];
          console.log({ callerPeerConnection, answer });
          callerPeerConnection?.setRemoteDescription(answer);
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling, callerPeerConnection]);
};

export default useIncommingCalleeAnswer;
