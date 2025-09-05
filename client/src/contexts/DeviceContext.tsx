import React, { createContext, useState, useEffect } from "react";
import { detectDeviceType } from "../helpers/deviceHelper";
import { DeviceType } from "../utils";

const DeviceContext = createContext<DeviceType>(DeviceType.DESKTOP);
export { DeviceContext };

export function DeviceProvider({ children }: React.PropsWithChildren) {
  const [deviceType, setDeviceType] = useState(detectDeviceType());

  useEffect(() => {
    const handleResize = () => setDeviceType(detectDeviceType());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <DeviceContext.Provider value={deviceType}>{children}</DeviceContext.Provider>;
}
