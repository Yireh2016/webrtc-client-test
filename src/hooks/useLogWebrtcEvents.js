import { useEffect } from "react";
import logguer from "../helpers/logguer";

const useLogWebRtcEvents = (peerConnection) => {
  useEffect(() => {
    if (peerConnection) {
      peerConnection.onsignalingstatechange = (event) => {
        logguer("peerConnection.onsignalingstatechange ", {
          state: peerConnection.signalingState,
          event,
        });
      };

      peerConnection.oniceconnectionstatechange = (event) => {
        logguer("peerConnection.oniceconnectionstatechange ", {
          state: peerConnection.iceConnectionState,
          event,
        });
      };

      peerConnection.onconnectionstatechange = (event) => {
        logguer("peerConnection.onconnectionstatechange ", {
          state: peerConnection.connectionState,
          event,
        });
      };

      peerConnection.onicegatheringstatechange = (event) => {
        logguer("peerConnection.onicegatheringstatechange ", {
          state: peerConnection.iceGatheringState,
          event,
        });
      };
    }
  }, [peerConnection]);
};

export default useLogWebRtcEvents;
