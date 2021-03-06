import { useEffect } from "react";
import { signalingEvents } from "../constants/signalingEvents";

const useIncommingCalleeAnswer = ({ signaling, callerPeerConnection }) => {
  useEffect(() => {
    signaling &&
      signaling.listen((eventName, ...args) => {
        if (eventName.match(signalingEvents.INCOMMING_CALLEE_ANSWER)) {
          const { answer } = args[0];
          callerPeerConnection.setRemoteDescription(answer);
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);
};

export default useIncommingCalleeAnswer;
