import stopStreamedVideo from "./stopStreamedVideo";

const endPeerConnectionHandler = (peerConnection, localVideo, remoteVideo) => {
  peerConnection && peerConnection.close();
  localVideo?.srcObject && stopStreamedVideo(localVideo);
  remoteVideo?.srcObject && stopStreamedVideo(remoteVideo);
};

export default endPeerConnectionHandler;
