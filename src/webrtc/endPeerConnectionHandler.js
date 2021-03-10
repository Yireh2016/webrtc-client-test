import stopStreamedVideo from "./stopStreamedVideo";

const endPeerConnectionHandler = (
  callerPeerConnectionContainer,
  setPeerConnection,
  localVideo,
  remoteVideo
) => {
  stopStreamedVideo(remoteVideo);
  stopStreamedVideo(localVideo);
  callerPeerConnectionContainer.destroyPeerConnection();
  setPeerConnection(null);
};

export default endPeerConnectionHandler;
