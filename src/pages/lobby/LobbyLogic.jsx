import React, { useContext, useRef, useEffect, useState } from "react";
import LobbyUi from "./LobbyUi";
import useIsMobile from "../../hooks/useIsMobile";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../wrappers/MobxWrapper";
import { signalingEvents } from "../../constants/signalingEvents";

import { Signaling } from "../../wrappers/WebSocketWrapper";
import stopStreamedVideo from "../../webrtc/stopStreamedVideo";
import useCalleeCallRejected from "../../hooks/useCalleeCallRejected";
import useCalleeIceResponse from "../../hooks/useCalleeIceResponse";
import useCallerIceRequest from "../../hooks/useCallerIceRequest";
import useIncommingCall from "../../hooks/useIncommingCall";
import useAcceptIncommingCall from "../../hooks/useAcceptIncommingCall";
import answerInit from "../../webrtc/answerInit";

const LobbyLogic = observer(() => {
  const [callerPeerConnection, setCallerPeerConnection] = useState(null);
  const {
    username,
    userList,
    isVideoCallModal,
    setIsVideoCallModal,
  } = useContext(StoreContext);
  let remoteVideoRef = useRef();
  let localVideoRef = useRef();
  const isMobible = useIsMobile();
  const signaling = useContext(Signaling);
  const [callee, setCallee] = useState();
  const [callerId, setCallerId] = useState("");
  const [userId, setUserId] = useState("");
  const [isIncommigCallModal, setIsIncommigCallModal] = useState(false);
  const [callerIceList, setCallerIceList] = useState([]);

  const endCall = () => {
    callerPeerConnection.close();
    setIsVideoCallModal(false);
    stopStreamedVideo(localVideoRef.current);
  };

  useCallerIceRequest({ signaling });

  useCalleeIceResponse({ signaling });

  useCalleeCallRejected({ signaling, setIsVideoCallModal, endCall });

  const caller = useIncommingCall({ signaling });

  useAcceptIncommingCall({
    signaling,
    localVideoRef,
    callee,
    caller,
    userList,
    username,
    setCallerPeerConnection,
  });

  useEffect(() => {
    caller && setIsIncommigCallModal(true);
  }, [caller]);

  const callRemoteUserHandler = async (callee) => {
    setIsVideoCallModal(true);

    signaling.send(signalingEvents.CALLING, {
      caller: userList.filter((_user) => _user.user_id === username)[0],
      callee,
    });
    setCallee(callee);
  };

  const toogleCamera = () => {};

  const toogleAudio = () => {};

  const onAcceptIncommingCall = async () => {
    setIsIncommigCallModal(false);

    signaling.send(signalingEvents.ACCEPT_INCOMMING_CALL, {
      caller,
      callee: userList.filter((_user) => _user.user_id === username)[0],
    });
    answerInit();
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
          callRemoteUserHandler,
          remoteVideo,
          localVideo,
          isVideoCallModal,
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
