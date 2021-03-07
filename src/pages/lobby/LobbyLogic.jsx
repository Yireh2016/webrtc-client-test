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
import useCallEnd from "../../hooks/useCallEnd";
import useIncommingCallerOffer from "../../hooks/useIncommingCallerOffer";
import useGetCallerOnIncommingCall from "../../hooks/useGetCallerOnIncommingCall";

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
  const [
    isOutgoingCallAcceptedByCallee,
    setIsOutgoingCallAcceptedByCallee,
  ] = useState(false);
  const [callerIceArr, setCallerIceArr] = useState([]);
  const [isIncommigCallModal, setIsIncommigCallModal] = useState(false);

  const caller = useMemo(
    () => userList.filter((_user) => _user.user_id === username)[0],
    [userList, username]
  );

  const callerOnIncommingCall = useGetCallerOnIncommingCall(signaling);

  useEffect(() => {
    if (callerOnIncommingCall) {
      setIsIncommigCallModal(true);
    }
  }, [callerOnIncommingCall]);

  useEffect(() => {
    signaling &&
      signaling.listen((eventName) => {
        switch (eventName) {
          case signalingEvents.INCOMMING_CALLEE_CALL_REJECTED:
            setCallee(undefined);
            setIsLobbyVideoCallModal(false);
            break;

          default:
            break;
        }
      });
  }, [signaling]);

  useEffect(() => {
    signaling &&
      signaling.listen((eventName) => {
        switch (eventName) {
          case signalingEvents.INCOMMING_CALLEE_CALL_ACCEPTED:
            insertStreamOnVideo(localVideoRef?.current, (stream) => {
              setStream(stream);
              peerConnectionHandler(stream, signaling, setCallerPeerConnection);
            });
            break;

          default:
            break;
        }
      });
  }, [signaling]);

  useCreateO;

  const onUserClick = (callee) => {
    setIsLobbyVideoCallModal(true);
    setCallee(callee);
    signaling.send(signalingEvents.SEND_CALLER_CALLING, {
      caller,
      callee,
    });
  };

  const onAcceptIncommingCall = () => {
    setIncommingCallCaller(callerOnIncommingCall);
    signaling.send(signalingEvents.SEND_CALLEE_CALL_ACCEPTED, {
      caller: callerOnIncommingCall,
    });
    history.push(routes.INCOMMING_CALL);
  };

  const onRejectIncommingCall = () => {
    setIncommingCallCaller(undefined);
    setIsIncommigCallModal(false);

    signaling.send(signalingEvents.SEND_CALLEE_CALL_REJECTED, {
      caller: callerOnIncommingCall,
    });
  };

  const toogleCamera = () => {};
  const endCall = () => {};
  const toogleAudio = () => {};

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
          caller: callerOnIncommingCall?.user_id || "",
        }}
      />
    </div>
  );
});

export default LobbyLogic;
