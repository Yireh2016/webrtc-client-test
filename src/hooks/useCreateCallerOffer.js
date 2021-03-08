import { useEffect } from "react";

const asyncCalleeCreateOffer = async (callerPeerConnection, setCallerOffer) => {
  const offer = await callerPeerConnection.createOffer();
  await callerPeerConnection.setLocalDescription(offer);
  setCallerOffer(offer);
};

const useCreateCallerOffer = (callerPeerConnection, setCallerOffer) => {
  useEffect(() => {
    if (callerPeerConnection) {
      callerPeerConnection.onnegotiationneeded = () =>
        asyncCalleeCreateOffer(callerPeerConnection, setCallerOffer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callerPeerConnection]);
};

export default useCreateCallerOffer;
