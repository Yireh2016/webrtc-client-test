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

import useAddRemoteIceCandidates from "../../hooks/useAddRemoteIceCandidates";
import useSendIceCandidates from "../../hooks/useSendIceCandidates";
import useOnTrack from "../../hooks/useOnTrack";

import IncommingCallUi from "./IncommingCallUi";
import { routes } from "../../constants/routes";
import logguer from "../../helpers/logguer";

const IncommingCallLogic = observer(() => {
  const history = useHistory();

  const signaling = useContext(Signaling);

  let remoteVideoRef = useRef();
  let localVideoRef = useRef();

  const [calleePeerConnection, setCalleePeerConnection] = useState(null);
  const [calleeStream, setCalleeStream] = useState();
  const [callerOffer, setCallerOffer] = useState();
  const [calleeAnswer, setCalleeAnswer] = useState();

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
            localVideoRef?.current &&
              logguer("INCOMMING_CALLER_OFFER", { localVideoRef });
            setCallerOffer(args[0].offer);
            localVideoRef?.current &&
              insertStreamOnVideo(localVideoRef.current, (stream) => {
                peerConnectionHandler(
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

  useEffect(() => {
    if (calleeAnswer) {
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
    history.push(routes.LOBBY);
  };

  const endCall = () => {
    endPeerConnectionHandler(
      calleePeerConnection,
      setCalleePeerConnection,
      localVideoRef.current,
      remoteVideoRef.current
    );
    resetCalleeState();
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
