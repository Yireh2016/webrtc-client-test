import React, { useContext, useRef, useEffect, useState, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import { signalingEvents } from "../../constants/signalingEvents";

import endPeerConnectionHandler from "../../webrtc/endPeerConnectionHandler";
import asyncCreateRemoteStream from "../../webrtc/asyncCreateRemoteStream";
import { toogleAudioTrack, toogleVideoTrack } from "../../webrtc/streamsToggle";

import { StoreContext } from "../../wrappers/MobxWrapper";
import { Signaling } from "../../wrappers/WebSocketWrapper";

import useCreateCalleePeerConection from "../../hooks/useCreateCalleePeerConection";
import useIncommingCallerOffer from "../../hooks/useIncommingCallerOffer";
import useSetIceArr from "../../hooks/useSetIceArr";
import useAddRemoteIceCandidates from "../../hooks/useAddRemoteIceCandidates";
import useCallEnd from "../../hooks/useCallEnd";

import IncommingCallUi from "./IncommingCallUi";
import { routes } from "../../constants/routes";

const IncommingCallLogic = observer(() => {
  const history = useHistory();

  const signaling = useContext(Signaling);

  let remoteVideoRef = useRef();
  let localVideoRef = useRef();

  const [calleePeerConnection, setCalleePeerConnection] = useState(null);
  const [calleeIceArr, setCalleeIceArr] = useState([]);

  const { incommingCallCaller, username, userList } = useContext(StoreContext);

  const callee = useMemo(
    () => userList.filter((_user) => _user.user_id === username)[0],
    [userList, username]
  );

  const asyncCalleeCreateAnswer = async (peerConnection) => {
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    signaling.send(signalingEvents.SEND_CALLEE_ANSWER, {
      caller: incommingCallCaller,
      callee,
      answer,
    });
    signaling.send(signalingEvents.SEND_CALLEE_ICE, {
      callee,
      calleeIce: calleeIceArr,
      caller: incommingCallCaller,
    });
  };

  const callerOffer = useIncommingCallerOffer(signaling);

  useEffect(() => {
    calleePeerConnection &&
      asyncCreateRemoteStream(
        remoteVideoRef,
        new MediaStream(),
        calleePeerConnection
      );
  }, [calleePeerConnection]);

  useSetIceArr(signaling, calleePeerConnection, calleeIceArr, setCalleeIceArr);

  const resetCalleeState = () => {
    setCalleePeerConnection(null);
  };

  const endPeerConnection = () => {
    endPeerConnectionHandler(
      calleePeerConnection,
      localVideoRef?.current,
      remoteVideoRef?.current
    );
    resetCalleeState();
  };

  const endCall = () => {
    endPeerConnection();
    signaling.send(signalingEvents.SEND_CALLEE_END_CALL, {
      caller: incommingCallCaller,
      callee,
    });
    history.push(routes.LOBBY);
  };

  useCallEnd(signaling, endPeerConnection);

  useAddRemoteIceCandidates(signaling, calleePeerConnection);

  useEffect(() => {
    if (callerOffer && calleePeerConnection) {
      calleePeerConnection?.setRemoteDescription(
        new RTCSessionDescription(callerOffer)
      );
      asyncCalleeCreateAnswer(calleePeerConnection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callerOffer, calleePeerConnection]);

  const stream = useCreateCalleePeerConection({
    signaling,
    localVideoRef,
    setCalleePeerConnection,
  });

  // una vez creada la peerConnection del lado del callee
  // se le informa al caller que la llamada fue aceptada
  // useEffect(() => {
  //   if (signaling && calleePeerConnection) {
  //     signaling.send(signalingEvents.SEND_CALLEE_CALL_ACEPTED, {
  //       caller: incommingCallCaller,
  //       callee,
  //     });
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [calleePeerConnection, signaling]);

  // se crea la peer coneccion en el callee al aceptar la llamada

  const toogleCamera = () => {
    toogleVideoTrack(stream);
  };

  const toogleAudio = () => {
    toogleAudioTrack(stream);
  };

  return (
    <IncommingCallUi
      {...{
        toogleCamera,
        endCall,
        toogleAudio,
        remoteVideoRef,
        localVideoRef,
      }}
    />
  );
});

export default IncommingCallLogic;
