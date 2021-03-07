import logguer from "../helpers/logguer";

const addIceCandidate = async (candidate, peerConnection) => {
  try {
    logguer("adding remote IceCandidates");
    await peerConnection.addIceCandidate(candidate);
  } catch (e) {
    console.error("Error adding received ice candidate", e);
  }
};

export default addIceCandidate;
