import stopStreamedVideo from "./stopStreamedVideo";

const endPeerConnectionHandler = (
  callerPeerConnectionContainer,
  setPeerConnection,
  localVideo,
  remoteVideo
) => {
  callerPeerConnectionContainer.destroyPeerConnection();
  stopStreamedVideo(remoteVideo);
  stopStreamedVideo(localVideo);
  setPeerConnection(null);
};

export default endPeerConnectionHandler;
