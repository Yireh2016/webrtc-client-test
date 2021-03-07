import getUserMediaAsync from "./getUserMediaAsync";

const insertStreamOnVideo = async (video, callback) => {
  const stream = await getUserMediaAsync(navigator);
  video.srcObject = stream;
  return callback(stream);
};

export default insertStreamOnVideo;
