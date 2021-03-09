export const STUN = `${process.env.REACT_APP_STUN}`;

export const events = {
  ICE_CANDIDATE: "icecandidate",
  ICE_STATE_CHANGE: "iceconnectionstatechange",
  ICE_GATHERING_CHANGE: "icegatheringstatechange",
  CONNECTION_STATE_CHANGE: "connectionstatechange",
  TRACK: "track",
};
