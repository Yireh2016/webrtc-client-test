class PeerConnectionContainer {
  constructor() {
    this.peerConnection = null;
  }

  createPeerConnection(config) {
    this.peerConnection = new RTCPeerConnection(config);
  }

  destroyPeerConnection() {
    if (this.peerConnection) {
      this.peerConnection.ontrack = null;
      this.peerConnection.onremovetrack = null;
      this.peerConnection.onremovestream = null;
      this.peerConnection.onicecandidate = null;
      this.peerConnection.oniceconnectionstatechange = null;
      this.peerConnection.onsignalingstatechange = null;
      this.peerConnection.onicegatheringstatechange = null;
      this.peerConnection.onnegotiationneeded = null;
      this.peerConnection.close()
    }
    this.peerConnection = null;
  }

  getPeerConnection() {
    return this.peerConnection;
  }
}

export default PeerConnectionContainer;
