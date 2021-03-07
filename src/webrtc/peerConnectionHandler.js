import { STUN } from "../constants/webrtc";

const peerConnectionHandler = (stream, signaling, setPeerConnection) => {
  if (signaling) {
    const servers = {
      iceServers: [{ urls: STUN }],
    };
    const peerConnection = new RTCPeerConnection(servers);
    stream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, stream));

    setPeerConnection(peerConnection);
  }
};
export default peerConnectionHandler;
