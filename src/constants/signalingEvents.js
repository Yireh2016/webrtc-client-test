const eventsArr = [
  "CALLER_DESCRIPTION_SENT",
  "INCOMMING_REMOTE_DESCRIPTION",
  "ANSWER_SENT",
  "USER_LIST",
  "USER_ALREADY_EXIST",
  "SEND_CALLER_ICE",
  "INCOMMING_CALLER_ICE",
  "CALLEE_ICE_OUT",
  "CALLEE_ICE_REQUEST_IN",
  "CALLEE_CALL_REJECTED",
  "DISCONNECT",
  "USER_REGISTERED",
  "CALLEE_ICE_RESPONSE",
  "SEND_CALLER_CALLING",
  "INCOMMING_CALLER_CALLING",
  "SEND_CALLEE_CALL_ACEPTED",
  "INCOMMING_CALLEE_CALL_ACEPTED",
  "SEND_CALLER_OFFER",
  "INCOMMING_CALLER_OFFER",
];

export const signalingEvents = {};

eventsArr.forEach((event) => {
  signalingEvents[event] = event.toLowerCase();
});
