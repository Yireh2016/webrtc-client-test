/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useEffect, useState, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import LobbyUi from "./LobbyUi";

import { StoreContext } from "../../wrappers/MobxWrapper";
import { Signaling } from "../../wrappers/WebSocketWrapper";

import { signalingEvents } from "../../constants/signalingEvents";
import { routes } from "../../constants/routes";

import stopStreamedVideo from "../../webrtc/stopStreamedVideo";

import useIsMobile from "../../hooks/useIsMobile";
import useCalleeCallRejected from "../../hooks/useCalleeCallRejected";
import useCalleeIceResponse from "../../hooks/useCalleeIceResponse";
import useIncommingIce from "../../hooks/useIncommingIce";
import useIncommingCalleeAnswer from "../../hooks/useIncommingCalleeAnswer";
import useIncommingCalleeCallAccepted from "../../hooks/useIncommingCalleeCallAccepted";
import useIncommingCallerCalling from "../../hooks/useIncommingCallerCalling";
import useSendIce from "../../hooks/useSendIce";

const LobbyLogic = observer(() => {
  const history = useHistory();
  // const [calleePeerConnection, setCalleePeerConnection] = useState(null);
  // const [callerPeerConnection, setCallerPeerConnection] = useState(null);
  const {
    username,
    userList,
    isLobbyVideoCallModal,
    setIsLobbyVideoCallModal,
    setIncommingCallCaller,
  } = useContext(StoreContext);
  let remoteVideoRef = useRef();
  let localVideoRef = useRef();
  const isMobible = useIsMobile();
  const signaling = useContext(Signaling);
  const [callee, setCallee] = useState();
  const [isIncommigCallModal, setIsIncommigCallModal] = useState(false);
  const caller = useMemo(
    () => userList.filter((_user) => _user.user_id === username)[0],
    [userList, username]
  );

  const asyncCallerCreateOffer = async (peerConnection) => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    signaling.send(signalingEvents.SEND_CALLER_OFFER, {
      caller,
      callee,
      offer,
    });
  };

  useIncommingCalleeAnswer({ signaling, callerPeerConnection });

  useSendIce({
    signaling,
    callerPeerConnection,
    callee,
    caller,
    emitter: "CALLER",
  });

  useIncommingCalleeCallAccepted({
    signaling,
    callerPeerConnection,
  });

  useIncommingIce({
    signaling,
    callerPeerConnection,
  });

  useEffect(() => {
    callerPeerConnection && asyncCallerCreateOffer(calleePeerConnection);
  }, [callerPeerConnection]);

  useEffect(() => {
    if (calleePeerConnection) {
      asyncCallerCreateOffer(calleePeerConnection);
    }
  }, [calleePeerConnection]);

  useCalleeIceResponse({ signaling });

  useCalleeCallRejected({ signaling, setIsLobbyVideoCallModal, endCall });

  const incommingCallCaller = useIncommingCallerCalling({ signaling });

  useEffect(() => {
    incommingCallCaller && setIsIncommigCallModal(true);
  }, [incommingCallCaller]);

  const onUserClick = async (callee) => {
    setIsLobbyVideoCallModal(true);

    signaling.send(signalingEvents.SEND_CALLER_CALLING, {
      caller,
      callee,
    });
    setCallee(callee);
  };

  const endCall = () => {
    // callerPeerConnection.close();
    setIsLobbyVideoCallModal(false);
    stopStreamedVideo(localVideoRef.current);
  };

  const toogleCamera = () => {};

  const toogleAudio = () => {};

  const onAcceptIncommingCall = async () => {
    setIsIncommigCallModal(false);
    setIncommingCallCaller(incommingCallCaller);
    history.push(routes.INCOMMING_CALL);
  };
  const onRejectIncommingCall = () => {
    const { socket } = signaling;
    socket.emit(signalingEvents.CALLEE_CALL_REJECTED);
  };

  const localVideo = (
    <video autoPlay playsInline id="localVideo" ref={localVideoRef}></video>
  );

  const remoteVideo = (
    <video autoPlay playsInline id="remoteVideo" ref={remoteVideoRef}></video>
  );

  return (
    <div>
      <LobbyUi
        isMobible={isMobible}
        {...{
          user: username,
          userList,
          onUserClick,
          remoteVideo,
          localVideo,
          isLobbyVideoCallModal,
          toogleCamera,
          endCall,
          toogleAudio,
          isIncommigCallModal,
          onAcceptIncommingCall,
          onRejectIncommingCall,
          caller: caller?.user_id || "",
        }}
      />
    </div>
  );
});

export default LobbyLogic;
