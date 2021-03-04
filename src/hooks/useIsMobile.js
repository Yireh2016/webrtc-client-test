import { useState, useEffect } from "react";

const checkWindowWidth = (window) => {
  if (window.innerWidth < 600) {
    return true;
  }

  return false;
};
const useIsMobile = () => {
  const [isMobile, setisMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const result = checkWindowWidth(window);
      setisMobile(result);
    });

    const result = checkWindowWidth(window);
    setisMobile(result);
  }, []);
  return isMobile;
};

export default useIsMobile;
