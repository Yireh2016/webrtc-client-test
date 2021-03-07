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

  const endCall = () => {};
  const toogleCamera = () => {
    // toogleVideoTrack(stream);
  };

  const toogleAudio = () => {
    // toogleAudioTrack(stream);
  };

  return (
    <IncommingCallUi
      {...{
        toogleCamera,
        endCall,
        toogleAudio,
        remoteVideoRef,
        localVideoRef,
        // isIncommigCallModal,
        // caller,
        // onAcceptIncommingCall,
        // onRejectIncommingCall,
      }}
    />
  );
});

export default IncommingCallLogic;
