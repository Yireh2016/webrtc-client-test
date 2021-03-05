const answerInit = async (...args) => {
  const { caller, callee } = args[0];
  console.log("answerInit", { caller, callee, callerIce });

  const servers = {
    iceServers: [{ urls: STUN }],
  };
  const calleePeerConnection = new RTCPeerConnection(servers);

  calleePeerConnection.onicecandidate = ({ candidate }) => {
    console.log("Sending callee ICE", candidate);
    candidate &&
      socket.emit(signalingEvents.CALLEE_ICE_RESPONSE, {
        callee: _callee,
        calleeIce: candidate,
        caller,
      });
  };

  calleePeerConnection.addEventListener(
    events.ICE_CANDIDATE,
    (event) => {
      console.log("callee events.ICE_CANDIDATE", events.ICE_CANDIDATE, {
        event,
      });
    }
    // handleConnection
  );
  calleePeerConnection.addEventListener(
    events.ICE_STATE_CHANGE,
    (event) => {
      console.log("callee events.ICE_STATE_CHANGE", events.ICE_STATE_CHANGE, {
        event,
      });
    }

    // handleConnectionChange
  );

  const stream = await getUserMediaAsync(navigator);

  calleePeerConnection.addStream(stream);

  localVideoRef.current.srcObject = stream;

  calleePeerConnection.setRemoteDescription(new RTCSessionDescription(offer));

  const answer = await calleePeerConnection.createAnswer();
  await calleePeerConnection.setLocalDescription(answer);

  socket.emit(signalingEvents.ANSWER_SENT, { caller, callee, answer });

  // setCallerId(caller.user_id);
  // setCallerIceList([...callerIceList].push(callerIce));
  // setCaller(caller);
  // setCallee(callee);
};

export default answerInit;
