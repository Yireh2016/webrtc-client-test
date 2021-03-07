const getUserMediaAsync = async (
  navigator,
  constraints = {
    audio: true,
    video: true,
  }
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    console.error("Error accessing media devices.", error);
  }
};

export default getUserMediaAsync;
