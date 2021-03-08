import stopStreamedVideo from "./stopStreamedVideo";

const endPeerConnectionHandler = (
  peerConnection,
  setPeerConnection,
  localVideo,
  remoteVideo
) => {
  // peerConnection && peerConnection.close();
  // localVideo?.srcObject && stopStreamedVideo(localVideo);
  // remoteVideo?.srcObject && stopStreamedVideo(remoteVideo);
  console.log({
    peerConnection,
    setPeerConnection,
    localVideo,
    localObj: localVideo?.srcObject,
    remoteVideo,
    remoteObj: remoteVideo?.srcObject,
  });

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
    // peerConnection.close();
  }
  peerConnection = null;
  setPeerConnection(null);
};

export default endPeerConnectionHandler;
