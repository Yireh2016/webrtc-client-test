/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import React, { useContext, useRef, useEffect, useState, useMemo } from "react";

import logguer from "../../helpers/logguer";

import LobbyUi from "./LobbyUi";

import { StoreContext } from "../../wrappers/MobxWrapper";
import { Signaling } from "../../wrappers/WebSocketWrapper";

import { routes } from "../../constants/routes";
import { signalingEvents } from "../../constants/signalingEvents";

import endPeerConnectionHandler from "../../webrtc/endPeerConnectionHandler";
import peerConnectionHandler from "../../webrtc/peerConnectionHandler";
import insertStreamOnVideo from "../../webrtc/insertStreamOnVideo";
import asyncCreateRemoteStream from "../../webrtc/asyncCreateRemoteStream";
import { toogleAudioTrack, toogleVideoTrack } from "../../webrtc/streamsToggle";

import { events } from "../../constants/webrtc";

import useSetIceArr from "../../hooks/useSetIceArr";
import useIsMobile from "../../hooks/useIsMobile";
import useAddRemoteIceCandidates from "../../hooks/useAddRemoteIceCandidates";
import useSetRemoteDescription from "../../hooks/useSetRemoteDescription";
import useSetCaller from "../../hooks/useSetCaller";
import useIsOutgoingCallAcceptedByCallee from "../../hooks/useIsOutgoingCallAcceptedByCallee";
import useCallEnd from "../../hooks/useCallEnd";

const LobbyLogic = observer(() => {
  const history = useHistory();
  const [callerPeerConnection, setCallerPeerConnection] = useState(null);
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

  const [stream, setStream] = useState();
  const [callee, setCallee] = useState();
  const [isIncommigCallModal, setIsIncommigCallModal] = useState(false);
  const [
    isOutgoingCallAcceptedByCallee,
    setIsOutgoingCallAcceptedByCallee,
  ] = useState(false);
  const [callerIceArr, setCallerIceArr] = useState([]);

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

  useIsOutgoingCallAcceptedByCallee(
    signaling,
    setIsOutgoingCallAcceptedByCallee
  );

  useEffect(() => {
    if (callerPeerConnection) {
      callerPeerConnection.addEventListener(
        events.CONNECTION_STATE_CHANGE,
        (event) => {
          logguer("events.CONNECTION_STATE_CHANGE", { event });
          if (callerPeerConnection.connectionState === "connected") {
            logguer("peers connected", { event });
          }
        }
      );
    }
  }, [callerPeerConnection]);

  useSetRemoteDescription(signaling, callerPeerConnection);

  useSetIceArr(signaling, callerPeerConnection, callerIceArr, setCallerIceArr);

  useAddRemoteIceCandidates(signaling, callerPeerConnection);

  useEffect(() => {
    if (callerPeerConnection) {
      asyncCallerCreateOffer(callerPeerConnection);
    }
  }, [callerPeerConnection]);

  useEffect(() => {
    callerPeerConnection &&
      asyncCreateRemoteStream(
        remoteVideoRef,
        new MediaStream(),
        callerPeerConnection
      );
  }, [callerPeerConnection]);

  const incommingCallCaller = useSetCaller({ signaling });

  useEffect(() => {
    incommingCallCaller && setIsIncommigCallModal(true);
  }, [incommingCallCaller]);

  useEffect(() => {
    if (isLobbyVideoCallModal && localVideoRef?.current) {
      insertStreamOnVideo(localVideoRef?.current, (stream) => {
        setStream(stream);
        peerConnectionHandler(stream, signaling, setCallerPeerConnection);
      });
    }
  }, [isLobbyVideoCallModal, localVideoRef?.current]);

  const onUserClick = async (callee) => {
    setIsLobbyVideoCallModal(true);
    setCallee(callee);
  };

  const endCall = () => {
    endPeerConnection();
    signaling.send(signalingEvents.SEND_CALLER_END_CALL, {
      caller: incommingCallCaller,
      callee,
    });
  };

  const resetCallerState = () => {
    setCallerPeerConnection(null);
    setIsLobbyVideoCallModal(false);
    setIsOutgoingCallAcceptedByCallee(false);
  };

  const endPeerConnection = () => {
    endPeerConnectionHandler(
      callerPeerConnection,
      localVideoRef?.current,
      remoteVideoRef?.current
    );
    resetCallerState();
  };

  useCallEnd(signaling, endPeerConnection);

  const toogleCamera = () => {
    toogleVideoTrack(stream);
  };

  const toogleAudio = () => {
    toogleAudioTrack(stream);
  };

  const onAcceptIncommingCall = async () => {
    setIsIncommigCallModal(false);
    setIncommingCallCaller(incommingCallCaller);
    history.push(routes.INCOMMING_CALL);
  };

  const onRejectIncommingCall = () => {
    signaling.send(signalingEvents.CALLEE_CALL_REJECTED);
  };

  return (
    <div>
      <LobbyUi
        isMobible={isMobible}
        {...{
          user: username,
          userList,
          onUserClick,
          remoteVideoRef,
          localVideoRef,
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
