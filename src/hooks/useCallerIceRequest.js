import { signalingEvents } from "../constants/signalingEvents";
import { useEffect } from "react";
import answerInit from "../webrtc/answerInit";

const useCallerIceRequest = ({ signaling }) => {
  useEffect(() => {
    if (signaling) {
      signaling.listen((eventName, ...args) => {
        switch (eventName) {
          case signalingEvents.CALLER_ICE_REQUEST:
            console.log("CALLER_ICE_REQUEST", { args });
            answerInit(...args, signaling);
            break;

          default:
            break;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);
};

export default useCallerIceRequest;
