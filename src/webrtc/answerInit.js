import peerConnectionHandler from "../webrtc/peerConnectionHandler";
import insertStreamOnVideo from "../webrtc/insertStreamOnVideo";

const answerInit = (videoRef, callee, caller, signaling) => {
  console.log("answerInit", {
    videoRef,
    callee,
    caller,
    signaling,
  });
  return insertStreamOnVideo(videoRef.current, (stream) =>
    peerConnectionHandler(stream, signaling, "CALLEE")
  );
};

export default answerInit;
