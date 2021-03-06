import { useEffect } from "react";
import peerConnectionHandler from "../webrtc/peerConnectionHandler";
import insertStreamOnVideo from "../webrtc/insertStreamOnVideo";

const useCreateCalleePeerConection = ({
  signaling,
  localVideoRef,
  setCalleePeerConnection,
}) => {
  useEffect(() => {
    signaling &&
      insertStreamOnVideo(localVideoRef?.current, (stream) => {
        peerConnectionHandler(stream, signaling, setCalleePeerConnection);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);
};

export default useCreateCalleePeerConection;
