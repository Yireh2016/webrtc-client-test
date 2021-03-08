const stopStreamedVideo = (videoElem) => {
  const stream = videoElem?.srcObject || null;
  console.log({ stream });
  const tracks = stream ? stream.getTracks() : [];
  console.log({ tracks });

  tracks.forEach(function (track) {
    track.stop();
  });
  console.log({ videoElem });

  if (videoElem && videoElem?.srcObject) {
    videoElem.srcObject = null;
  }
};
export default stopStreamedVideo;
