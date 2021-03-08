import stopStreamedVideo from "./stopStreamedVideo";

const endPeerConnectionHandler = (
  peerConnection,
  setPeerConnection,
  localVideo,
  remoteVideo
) => {
  stopStreamedVideo(remoteVideo);

  stopStreamedVideo(localVideo);

  if (peerConnection) {
    peerConnection.ontrack = null;
    peerConnection.onremovetrack = null;
    peerConnection.onremovestream = null;
    peerConnection.onicecandidate = null;
    peerConnection.oniceconnectionstatechange = null;
    peerConnection.onsignalingstatechange = null;
    peerConnection.onicegatheringstatechange = null;
    peerConnection.onnegotiationneeded = null;
  }
  peerConnection = null;
  setPeerConnection(null);
};

export default endPeerConnectionHandler;
