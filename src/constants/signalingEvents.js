const eventsArr = [
  "CALLER_DESCRIPTION_SENT",
  "INCOMMING_REMOTE_DESCRIPTION",
  "ANSWER_SENT",
  "USER_LIST",
  "USER_ALREADY_EXIST",
  "CALLER_ICE_REQUEST",
  "CALLEE_CALL_REJECTED",
  "DISCONNECT",
  "USER_REGISTERED",
  "CALLEE_ICE_RESPONSE",
  "CALLING",
  "ACCEPT_INCOMMING_CALL",
];

export const signalingEvents = {};

eventsArr.forEach((event) => {
  signalingEvents[event] = event.toLowerCase();
});
