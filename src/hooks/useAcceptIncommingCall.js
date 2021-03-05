import { useEffect } from "react";
import { signalingEvents } from "../constants/signalingEvents";
import peerConnectionHandler from "../webrtc/peerConnectionHandler";
import getUserMediaAsync from "../webrtc/getUserMediaAsync";

const asyncCallInit = async (video, callback) => {
  const stream = await getUserMediaAsync(navigator);
  video.srcObject = stream;
  callback(stream);
};

const useAcceptIncommingCall = ({
  signaling,
  localVideoRef,
  callee,
  caller,
  userList,
  username,
  setCallerPeerConnection,
}) => {
  useEffect(() => {
    signaling &&
      signaling.listen((eventName, ...args) => {
        if (eventName.match(signalingEvents.ACCEPT_INCOMMING_CALL)) {
          asyncCallInit(localVideoRef.current, (stream) =>
            peerConnectionHandler(
              callee,
              stream,
              userList,
              username,
              signaling,
              setCallerPeerConnection
            )
          );
        }
      });
  }, [signaling]);
};

export default useAcceptIncommingCall;
