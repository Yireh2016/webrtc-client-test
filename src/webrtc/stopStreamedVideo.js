const stopStreamedVideo = (videoElem) => {
  console.log("check stopStreamedVideo", {
    videoElem,
    stream: videoElem?.srcObject,
    tracks: videoElem?.srcObject.getTracks(),
  });
  if (videoElem && videoElem.srcObject) {
    videoElem.srcObject.getTracks().forEach((track) => track.stop());
  }
  if (videoElem && videoElem?.srcObject) {
    videoElem.srcObject = null;
  }
};
export default stopStreamedVideo;
