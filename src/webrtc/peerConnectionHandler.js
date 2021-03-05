import { STUN, events } from "../constants/webrtc";
import { signalingEvents } from "../constants/signalingEvents";

const peerConnectionHandler = async (
  callee,
  caller,
  stream,
  userList,
  username,
  signaling,
  setCallerPeerConnection
) => {
  if (signaling) {
    const servers = {
      iceServers: [{ urls: STUN }],
    };
    const callerPeerConnection = new RTCPeerConnection(servers);
    console.log({ setCallerPeerConnection });
    setCallerPeerConnection && setCallerPeerConnection(callerPeerConnection);
    stream
      .getTracks()
      .forEach((track) => callerPeerConnection.addTrack(track, stream));

    callerPeerConnection.onicecandidate = ({ candidate }) => {
      candidate &&
        signaling.send(signalingEvents.CALLER_ICE_REQUEST, {
          callee,
          callerIce: candidate,
          caller,
        });
    };

    callerPeerConnection.addEventListener(events.ICE_STATE_CHANGE, (event) => {
      console.log("events.ICE_STATE_CHANGE", events.ICE_STATE_CHANGE, {
        event,
      });
    });

    callerPeerConnection.onnegotiationneeded = async (event) => {
      console.log("onnegotiationneeded", {
        event,
      });
      try {
        await callerPeerConnection.setLocalDescription(
          await callerPeerConnection.createOffer()
        );
        // Send the offer to the other peer.

        signaling.send(signalingEvents.CALLER_DESCRIPTION_SENT, {
          callerLocalDescription: callerPeerConnection.localDescription,
          callee,
          caller,
        });
      } catch (err) {
        console.error(err);
      }
    };
  }
};
export default peerConnectionHandler;
