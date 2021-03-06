const getUserMediaAsync = async (navigator) => {
  const constraints = {
    audio: false,
    video: true,
  };
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log("Got MediaStream:", stream);
    return stream;
  } catch (error) {
    console.error("Error accessing media devices.", error);
  }
};

export default getUserMediaAsync;
