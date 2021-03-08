/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useEffect, useState, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import { signalingEvents } from "../../constants/signalingEvents";

import peerConnectionHandler from "../../webrtc/peerConnectionHandler";
import insertStreamOnVideo from "../../webrtc/insertStreamOnVideo";
import endPeerConnectionHandler from "../../webrtc/endPeerConnectionHandler";
import { toogleAudioTrack, toogleVideoTrack } from "../../webrtc/streamsToggle";

import { StoreContext } from "../../wrappers/MobxWrapper";
import { Signaling } from "../../wrappers/WebSocketWrapper";
import { PeerConnectionContext } from "../../wrappers/PeerConnectionWrapper";

import useAddRemoteIceCandidates from "../../hooks/useAddRemoteIceCandidates";
import useSendIceCandidates from "../../hooks/useSendIceCandidates";
import useOnTrack from "../../hooks/useOnTrack";

import IncommingCallUi from "./IncommingCallUi";
import { routes } from "../../constants/routes";

import logguer from "../../helpers/logguer";
import useLogWebRtcEvents from "../../hooks/useLogWebrtcEvents";
import useTerminateCallOnConnected from "../../hooks/useTerminateCallOnConnected";

const IncommingCallLogic = observer(() => {
  const history = useHistory();

  const signaling = useContext(Signaling);
  const calleePeerConnectionContainer = useContext(PeerConnectionContext);

  let remoteVideoRef = useRef();
  let localVideoRef = useRef();

  const [calleePeerConnection, setCalleePeerConnection] = useState(null);
  const [calleeStream, setCalleeStream] = useState();
  const [callerOffer, setCallerOffer] = useState();
  const [calleeAnswer, setCalleeAnswer] = useState();
  const [isCallTerminated, setIsCallTerminated] = useState(false);

  const {
    incommingCallCaller,
    username,
    userList,
    setIncommingCallCaller,
  } = useContext(StoreContext);

  const callee = useMemo(
    () => userList.filter((_user) => _user.user_id === username)[0],
    [userList, username]
  );

  useEffect(() => {
    if (signaling && localVideoRef) {
      signaling.listen((eventName, ...args) => {
        switch (eventName) {
          case signalingEvents.INCOMMING_CALLER_OFFER:
            localVideoRef?.current && setCallerOffer(args[0].offer);
            localVideoRef?.current &&
              insertStreamOnVideo(localVideoRef.current, (stream) => {
                peerConnectionHandler(
                  calleePeerConnectionContainer,
                  stream,
                  signaling,
                  setCalleePeerConnection
                );
                setCalleeStream(stream);
              });
            break;

          default:
            break;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling, localVideoRef]);

  useLogWebRtcEvents(calleePeerConnection);

  const terminateCall = () => {
    endPeerConnectionHandler(
      calleePeerConnectionContainer,
      setCalleePeerConnection,
      document.querySelector("[data-id='localVideo']"),
      document.querySelector("[data-id='remoteVideo']")
    );
    resetCalleeState();
    history.push(routes.LOBBY);
  };

  useTerminateCallOnConnected(
    calleePeerConnection,
    isCallTerminated,
    terminateCall
  );

  useEffect(() => {
    if (isCallTerminated && calleePeerConnection) {
      calleePeerConnection.connectionState === "connected" && terminateCall();
    }
  }, [isCallTerminated, calleePeerConnection]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);

  useEffect(() => {
    if (calleeAnswer && incommingCallCaller && callee) {
      signaling.send(signalingEvents.SEND_CALLEE_ANSWER, {
        answer: calleeAnswer,
        caller: incommingCallCaller,
        callee,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calleeAnswer]);

  useOnTrack(calleePeerConnection, remoteVideoRef?.current);

  const asycnCreateAnswer = async (description, calleePeerConnection) => {
    await calleePeerConnection.setRemoteDescription(description);
    const answer = await calleePeerConnection.createAnswer();
    calleePeerConnection.setLocalDescription(answer);
    setCalleeAnswer(answer);
  };

  useEffect(() => {
    if (callerOffer && calleePeerConnection) {
      const description = new RTCSessionDescription(callerOffer);
      asycnCreateAnswer(description, calleePeerConnection);
    }
  }, [callerOffer, calleePeerConnection]);

  useSendIceCandidates(
    signaling,
    calleePeerConnection,
    incommingCallCaller,
    callee,
    "CALLEE"
  );

  useAddRemoteIceCandidates(signaling, calleePeerConnection);

  const resetCalleeState = () => {
    setCalleePeerConnection(null);
    setCalleeStream(undefined);
    setCallerOffer(undefined);
    setCalleeAnswer(undefined);
    setIncommingCallCaller(null);
    setIsCallTerminated(false);
  };

  const endCall = () => {
    signaling.send(signalingEvents.SEND_CALLEE_END_CALL, {
      caller: incommingCallCaller,
    });
    setIsCallTerminated(true);
  };

  const toogleCamera = () => {
    calleeStream && toogleVideoTrack(calleeStream);
  };

  const toogleAudio = () => {
    calleeStream && toogleAudioTrack(calleeStream);
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
