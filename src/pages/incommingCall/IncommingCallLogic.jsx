import React, { useContext, useRef, useEffect, useState, useMemo } from "react";
import { observer } from "mobx-react-lite";

import { signalingEvents } from "../../constants/signalingEvents";

import stopStreamedVideo from "../../webrtc/stopStreamedVideo";

import { StoreContext } from "../../wrappers/MobxWrapper";
import { Signaling } from "../../wrappers/WebSocketWrapper";

import useCreateCalleePeerConection from "../../hooks/useCreateCalleePeerConection";
import useIncommingCallerOffer from "../../hooks/useIncommingCallerOffer";
import useSendIce from "../../hooks/useSendIce";
import useIncommingIce from "../../hooks/useIncommingIce";

import IncommingCallUi from "./IncommingCallUi";

const IncommingCallLogic = observer(() => {
  const signaling = useContext(Signaling);

  let remoteVideoRef = useRef();
  let localVideoRef = useRef();
  const [calleePeerConnection, setCalleePeerConnection] = useState(null);
  const {
    setIsLobbyVideoCallModal,
    incommingCallCaller,
    username,
    userList,
  } = useContext(StoreContext);
  const callee = useMemo(
    () => userList.filter((_user) => _user.user_id === username)[0],
    [userList, username]
  );

  console.log("IncommingCallLogic", { calleePeerConnection });
  const asyncCalleeCreateAnswer = async (peerConnection) => {
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    signaling.send(signalingEvents.SEND_CALLEE_ANSWER, {
      caller: incommingCallCaller,
      callee,
      answer,
    });
  };

  const callerOffer = useIncommingCallerOffer({
    signaling,
    localVideoRef,
    setCalleePeerConnection,
  });

  const asyncCreateRemoteStream = async (remoteStream, peerConnection) => {
    remoteVideoRef.current.srcObject = remoteStream;
    peerConnection.addEventListener("track", async (event) => {
      console.log("asyncCreateRemoteStream track", { event });
      remoteStream.addTrack(event.track, remoteStream);
    });
  };
  useEffect(() => {
    calleePeerConnection &&
      asyncCreateRemoteStream(new MediaStream(), calleePeerConnection);
  }, [calleePeerConnection]);

  useSendIce({
    signaling,
    calleePeerConnection,
    callee,
    caller: incommingCallCaller,
    emitter: "CALLEE",
  });

  useIncommingIce({
    signaling,
    calleePeerConnection,
  });

  useEffect(() => {
    if (callerOffer && calleePeerConnection) {
      calleePeerConnection?.setRemoteDescription(
        new RTCSessionDescription(callerOffer)
      );
      asyncCalleeCreateAnswer(calleePeerConnection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callerOffer, calleePeerConnection]);

  const toogleCamera = () => {};

  const toogleAudio = () => {};

  const endCall = () => {
    calleePeerConnection.close();
    setIsLobbyVideoCallModal(false);
    stopStreamedVideo(localVideoRef?.current);
  };

  // se crea la peer coneccion en el callee al aceptar la llamada
  useCreateCalleePeerConection({
    signaling,
    localVideoRef,
    setCalleePeerConnection,
  });

  // una vez creada la peerConnection del lado del callee
  // se le informa al caller que la llamada fue aceptada
  useEffect(() => {
    if (signaling && calleePeerConnection) {
      console.log("useEffect", { calleePeerConnection, signaling });

      signaling.send(signalingEvents.SEND_CALLEE_CALL_ACEPTED, {
        caller: incommingCallCaller,
        callee,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calleePeerConnection, signaling]);

  const localVideo = (
    <video autoPlay playsInline id="localVideo" ref={localVideoRef}></video>
  );

  const remoteVideo = (
    <video autoPlay playsInline id="remoteVideo" ref={remoteVideoRef}></video>
  );

  return (
    <IncommingCallUi
      {...{
        toogleCamera,
        endCall,
        toogleAudio,
        remoteVideo,
        localVideo,
      }}
    />
  );
});

export default IncommingCallLogic;
