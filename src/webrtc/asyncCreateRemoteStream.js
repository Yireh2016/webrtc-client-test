import logguer from "../helpers/logguer";

const asyncCreateRemoteStream = async (
  remoteVideoRef,
  remoteStream,
  peerConnection
) => {
  logguer("asyncCreateRemoteStream", {
    remoteVideoRef,
    remoteStream,
    peerConnection,
  });
  remoteVideoRef.current.srcObject = remoteStream;
  peerConnection.addEventListener("track", async (event) => {
    remoteStream.addTrack(event.track, remoteStream);
  });
};
export default asyncCreateRemoteStream;
