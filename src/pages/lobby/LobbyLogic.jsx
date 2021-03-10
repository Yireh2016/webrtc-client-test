/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import React, { useContext, useRef, useEffect, useState, useMemo } from "react";

import LobbyUi from "./LobbyUi";

import { StoreContext } from "../../wrappers/MobxWrapper";
import { Signaling } from "../../wrappers/WebSocketWrapper";
import { PeerConnectionContext } from "../../wrappers/PeerConnectionWrapper";

import { routes } from "../../constants/routes";
import { signalingEvents } from "../../constants/signalingEvents";

import endPeerConnectionHandler from "../../webrtc/endPeerConnectionHandler";
import peerConnectionHandler from "../../webrtc/peerConnectionHandler";
import insertStreamOnVideo from "../../webrtc/insertStreamOnVideo";
import { toogleAudioTrack, toogleVideoTrack } from "../../webrtc/streamsToggle";

import useIsMobile from "../../hooks/useIsMobile";
import useAddRemoteIceCandidates from "../../hooks/useAddRemoteIceCandidates";
import useGetCallerOnIncommingCall from "../../hooks/useGetCallerOnIncommingCall";
import useCreateCallerOffer from "../../hooks/useCreateCallerOffer";
import useSendIceCandidates from "../../hooks/useSendIceCandidates";
import useOnTrack from "../../hooks/useOnTrack";
import logguer from "../../helpers/logguer";
import useLogWebRtcEvents from "../../hooks/useLogWebrtcEvents";
import useTerminateCallOnConnected from "../../hooks/useTerminateCallOnConnected";

const LobbyLogic = observer(() => {
  const history = useHistory();

  const [callerOffer, setCallerOffer] = useState(false);
  const [callerPeerConnection, setCallerPeerConnection] = useState(null);
  const [callerStream, setCallerStream] = useState();
  const [callee, setCallee] = useState();
  const [isIncommigCallModal, setIsIncommigCallModal] = useState(false);
  const [isCallTerminated, setIsCallTerminated] = useState(false);
  const [
    isCallerRejectedBeforeAnswer,
    setIsCallerRejectedBeforeAnswer,
  ] = useState(false);
  const [isCalleeAcceptedCall, setIsCalleeAcceptedCall] = useState(false);

  const {
    username,
    userList,
    isLobbyVideoCallModal,
    setIsLobbyVideoCallModal,
    setIncommingCallCaller,
    setUsername,
  } = useContext(StoreContext);

  const callerPeerConnectionContainer = useContext(PeerConnectionContext);

  let remoteVideoRef = useRef();
  let localVideoRef = useRef();
  const isMobible = useIsMobile();
  const signaling = useContext(Signaling);

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
      localVideoRef &&
      signaling.listen((eventName) => {
        switch (eventName) {
          case signalingEvents.INCOMMING_CALLEE_CALL_ACCEPTED:
            setIsCalleeAcceptedCall(true);
            localVideoRef?.current &&
              !isCallerRejectedBeforeAnswer &&
              insertStreamOnVideo(localVideoRef.current, (stream) => {
                setCallerStream(stream);
                peerConnectionHandler(
                  callerPeerConnectionContainer,
                  stream,
                  signaling,
                  setCallerPeerConnection
                );
              });
            break;

          default:
            break;
        }
      });
  }, [signaling, localVideoRef, isCallerRejectedBeforeAnswer]);


  useEffect(() => {
    signaling &&
      callerPeerConnection &&
      signaling.listen((eventName, ...args) => {
        switch (eventName) {
          case signalingEvents.INCOMMING_CALLEE_ANSWER:
            const { answer } = args[0];
            const description = new RTCSessionDescription(answer);
            asyncSetRemoteDescription(description, callerPeerConnection);
            break;

          default:
            break;
        }
      });
  }, [signaling, callerPeerConnection]);

  useEffect(() => {
    if (signaling) {
      signaling.listen((eventName) => {
        switch (eventName) {
          case signalingEvents.INCOMMING_CALLEE_END_CALL:
            setIsCallTerminated(true);
            break;

          default:
            break;
        }
      });
    }
    
  }, [signaling]);

  useEffect(() => {
    if (signaling) {
      signaling.listen((eventName) => {
        switch (eventName) {
          case signalingEvents.INCOMMING_CALLER_END_CALL:
            setIsCallTerminated(true);
            break;

          default:
            break;
        }
      });
    }
    
  }, [signaling]);


  useSendIceCandidates(
    signaling,
    callerPeerConnection,
    caller,
    callee,
    "CALLER"
  );

  useAddRemoteIceCandidates(signaling, callerPeerConnection);

  useOnTrack(callerPeerConnection, remoteVideoRef?.current);

 

  useEffect(() => {
    if (signaling && callerOffer && callee && caller) {
      signaling.send(signalingEvents.SEND_CALLER_OFFER, {
        caller,
        callee,
        offer: callerOffer,
      });
    }
  }, [signaling, callerOffer]);

  const asyncSetRemoteDescription = async (
    description,
    callerPeerConnection
  ) => {
    description &&
      (await callerPeerConnection.setRemoteDescription(description));
  };



  useCreateCallerOffer(callerPeerConnection, setCallerOffer);

  useLogWebRtcEvents(callerPeerConnection);

  const terminateCall = () => {
    endPeerConnectionHandler(
      callerPeerConnectionContainer,
      setCallerPeerConnection,
      document.querySelector("[data-id='localVideo']"),
      document.querySelector("[data-id='remoteVideo']")
    );

    resetCallerState();
  };

  // useTerminateCallOnConnected(
  //   callerPeerConnection,
  //   isCallTerminated,
  //   terminateCall
  // );

  // useEffect(() => {
  //   if (isCallTerminated && callerPeerConnection) {
  //     callerPeerConnection.connectionState === "connected" && terminateCall();
  //   } else if (isCallTerminated && isCallerRejectedBeforeAnswer) {
  //     terminateCall();
  //   }
  // }, [isCallTerminated, callerPeerConnection]);

    useEffect(() => {
    if (isCallTerminated && callerPeerConnection) {
       terminateCall();
       setIsCallTerminated(false)
    }
  }, [isCallTerminated, callerPeerConnection]);





  const onUserClick = (callee) => {
    setIsLobbyVideoCallModal(true);
    setCallee(callee);
    signaling.send(signalingEvents.SEND_CALLER_CALLING, {
      caller,
      callee,
    });
  };

  const onAcceptIncommingCall = () => {
    if (isCallTerminated) {
      terminateCall();
      return;
    }
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

  const resetCallerState = () => {
    setCallerOffer(false);
    setCallerPeerConnection(null);
    setCallerStream(undefined);
    setCallee(undefined);
    setIsIncommigCallModal(false);
    setIsLobbyVideoCallModal(false);
    setIncommingCallCaller(null);
    setIsCallTerminated(false);
    setIsCallerRejectedBeforeAnswer(false);
    setIsCalleeAcceptedCall(false);
  };

  const endCall = () => {
    if (!isCalleeAcceptedCall) {
      setIsCallerRejectedBeforeAnswer(true);
    }
    signaling.send(signalingEvents.SEND_CALLER_END_CALL, {
      callee,
    });
    setIsCallTerminated(true);
  };
  const toogleCamera = () => {
    callerStream && toogleVideoTrack(callerStream);
  };

  const toogleAudio = () => {
    callerStream && toogleAudioTrack(callerStream);
  };

  const onLogout = () => {
    setUsername("");
    signaling.disconnect();
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
          caller: callerOnIncommingCall?.user_id || "",
          onLogout,
        }}
      />
    </div>
  );
});

export default LobbyLogic;
