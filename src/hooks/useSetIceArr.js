import { useEffect } from "react";

const useSetIceArr = (signaling, peerConnection, iceArr, setIceArr) => {
  useEffect(() => {
    if (signaling && peerConnection) {
      peerConnection.onicecandidate = ({ candidate }) => {
        const iceArrCopy = [...iceArr];
        iceArrCopy.push(candidate);
        candidate && setIceArr(iceArrCopy);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling, peerConnection]);
};

export default useSetIceArr;
