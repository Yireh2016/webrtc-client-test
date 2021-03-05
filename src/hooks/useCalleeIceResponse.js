import { signalingEvents } from "../constants/signalingEvents";
import { useEffect, useState } from "react";

const useCalleeIceResponse = ({ signaling }) => {
  const [calleeIceList, setCalleeIceList] = useState([]);

  useEffect(() => {
    if (signaling) {
      signaling.listen((eventName, ...args) => {
        switch (eventName) {
          case signalingEvents.CALLEE_ICE_RESPONSE:
            console.log("CALLEE_ICE_RESPONSE", { args });
            const { calleeIce } = args[0];
            setCalleeIceList([...calleeIceList].push(calleeIce));
            break;

          default:
            break;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);

  return {
    calleeIceList,
  };
};

export default useCalleeIceResponse;
