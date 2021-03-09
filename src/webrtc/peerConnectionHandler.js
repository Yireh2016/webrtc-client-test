import { STUN } from "../constants/webrtc";

const peerConnectionHandler = (
  peerConnectionContainer,
  stream,
  signaling,
  setPeerConnection
) => {
  if (signaling) {
    const servers = {
      iceServers: [
        {
          urls: `${process.env.REACT_APP_TURN}`,
          username: `${process.env.REACT_APP_TURN_USERNAME}`,
          credential: `${process.env.REACT_APP_TURN_CREDENTIAL}`,
        },
        {
          urls: STUN,
        },
      ],
    };
    peerConnectionContainer.createPeerConnection(servers);

    const peerConnection = peerConnectionContainer.getPeerConnection();
    stream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, stream));
    setPeerConnection(peerConnection);
  }
};
export default peerConnectionHandler;
