import { useEffect } from "react";

const useOnTrack = (peerConnection, remoteVideo) => {
  useEffect(() => {
    if (peerConnection && remoteVideo) {
      peerConnection.ontrack = (event) => {
        console.log("ontrack", { peerConnection, remoteVideo, event });
        const track = event.streams[0];
        remoteVideo.srcObject = track;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peerConnection, remoteVideo]);
};

export default useOnTrack;
