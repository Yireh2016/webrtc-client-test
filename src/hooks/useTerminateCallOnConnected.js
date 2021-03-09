import { useEffect } from "react";

const useTerminateCallOnConnected = (
  peerConnection,
  isCallTerminated,
  terminateCall
) => {
  useEffect(() => {
    if (peerConnection) {
      peerConnection.onconnectionstatechange = (event) => {
        if (
          isCallTerminated &&
          peerConnection.connectionState === "connected"
        ) {
          terminateCall();
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peerConnection, isCallTerminated]);
};

export default useTerminateCallOnConnected;
