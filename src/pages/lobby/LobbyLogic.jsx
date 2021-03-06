/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import React, { useContext, useRef, useEffect, useState, useMemo } from "react";

import LobbyUi from "./LobbyUi";

import { StoreContext } from "../../wrappers/MobxWrapper";
import { Signaling } from "../../wrappers/WebSocketWrapper";

import { routes } from "../../constants/routes";
import { signalingEvents } from "../../constants/signalingEvents";

import stopStreamedVideo from "../../webrtc/stopStreamedVideo";
import peerConnectionHandler from "../../webrtc/peerConnectionHandler";
import insertStreamOnVideo from "../../webrtc/insertStreamOnVideo";

import { events } from "../../constants/webrtc";

import useSendIce from "../../hooks/useSendIce";
import useIsMobile from "../../hooks/useIsMobile";
import useIncommingIce from "../../hooks/useIncommingIce";
import useIncommingCalleeAnswer from "../../hooks/useIncommingCalleeAnswer";
import useIncommingCallerCalling from "../../hooks/useIncommingCallerCalling";
import useIncommingCalleeCallAccepted from "../../hooks/useIncommingCalleeCallAccepted";

const LobbyLogic = observer(() => {
  const history = useHistory();
  // const [calleePeerConnection, setCalleePeerConnection] = useState(null);
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
  const [callee, setCallee] = useState();
  const [isIncommigCallModal, setIsIncommigCallModal] = useState(false);
  const caller = useMemo(
    () => userList.filter((_user) => _user.user_id === username)[0],
    [userList, username]
  );

  console.log("LobbyLogic", { remoteVideoRef, localVideoRef });
  useEffect(() => {
    console.log("mounting LobbyLogic");
    return () => {
      console.log("unmounting LobbyLogic");
    };
  }, []);
  const asyncCallerCreateOffer = async (peerConnection) => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    signaling.send(signalingEvents.SEND_CALLER_OFFER, {
      caller,
      callee,
      offer,
    });
  };

  const iscalleeCallAccepted = useIncommingCalleeCallAccepted({
    signaling,
  });

  useEffect(() => {
    if (callerPeerConnection) {
      callerPeerConnection.addEventListener(
        events.CONNECTION_STATE_CHANGE,
        (event) => {
          if (callerPeerConnection.connectionState === "connected") {
            console.log("peers connected", { event });
          }
        }
      );
    }
  }, [callerPeerConnection]);
  useIncommingCalleeAnswer(signaling, callerPeerConnection);

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
    iscalleeCallAccepted && asyncCallerCreateOffer(callerPeerConnection);
  }, [iscalleeCallAccepted]);

  useEffect(() => {
    if (callerPeerConnection) {
      asyncCallerCreateOffer(callerPeerConnection);
    }
  }, [callerPeerConnection]);

  const asyncCreateRemoteStream = async (remoteStream, peerConnection) => {
    remoteVideoRef.current.srcObject = remoteStream;
    peerConnection.addEventListener("track", async (event) => {
      console.log("asyncCreateRemoteStream track", { event });
      remoteStream.addTrack(event.track, remoteStream);
    });
  };
  useEffect(() => {
    callerPeerConnection &&
      asyncCreateRemoteStream(new MediaStream(), callerPeerConnection);
  }, [callerPeerConnection]);

  const incommingCallCaller = useIncommingCallerCalling({ signaling });

  useEffect(() => {
    incommingCallCaller && setIsIncommigCallModal(true);
  }, [incommingCallCaller]);

  useEffect(() => {
    if (isLobbyVideoCallModal && localVideoRef?.current) {
      insertStreamOnVideo(localVideoRef?.current, (stream) => {
        peerConnectionHandler(stream, signaling, setCallerPeerConnection);
      });

      signaling.send(signalingEvents.SEND_CALLER_CALLING, {
        caller,
        callee,
      });
    }
  }, [isLobbyVideoCallModal, localVideoRef?.current]);
  const onUserClick = async (callee) => {
    setIsLobbyVideoCallModal(true);

    setCallee(callee);
  };

  const endCall = () => {
    // callerPeerConnection.close();
    setIsLobbyVideoCallModal(false);
    stopStreamedVideo(localVideoRef?.current);
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
