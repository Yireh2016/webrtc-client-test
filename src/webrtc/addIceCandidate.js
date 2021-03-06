const addIceCandidate = async (candidate, peerConnection) => {
  try {
    await peerConnection.addIceCandidate(candidate);
  } catch (e) {
    console.error("Error adding received ice candidate", e);
  }
};

export default addIceCandidate;
