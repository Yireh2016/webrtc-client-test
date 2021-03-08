const stopStreamedVideo = (videoElem) => {
  if (videoElem && videoElem.srcObject) {
    videoElem.srcObject.getTracks().forEach((track) => track.stop());
  }
  if (videoElem && videoElem?.srcObject) {
    videoElem.srcObject = null;
  }
};
export default stopStreamedVideo;
