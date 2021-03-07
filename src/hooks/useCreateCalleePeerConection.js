import { useEffect, useState } from "react";
import peerConnectionHandler from "../webrtc/peerConnectionHandler";
import insertStreamOnVideo from "../webrtc/insertStreamOnVideo";

const useCreateCalleePeerConection = ({
  signaling,
  localVideoRef,
  setCalleePeerConnection,
}) => {
  const [stream, setStream] = useState();
  useEffect(() => {
    signaling &&
      insertStreamOnVideo(localVideoRef?.current, (stream) => {
        setStream(stream);
        peerConnectionHandler(stream, signaling, setCalleePeerConnection);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);
  return stream;
};

export default useCreateCalleePeerConection;
