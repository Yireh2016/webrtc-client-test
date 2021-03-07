const toogleVideoTrack = (stream) => {
  const mutedStatus = stream.getVideoTracks()[0].enabled;
  stream.getVideoTracks()[0].enabled = !mutedStatus;
};

const toogleAudioTrack = (stream) => {
  const mutedStatus = stream.getAudioTracks()[0].enabled;
  stream.getAudioTracks()[0].enabled = !mutedStatus;
};

export { toogleVideoTrack, toogleAudioTrack };
