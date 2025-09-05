import { useContext } from "react";
import { DeviceContext } from "../contexts/DeviceContext";

export function useDeviceType() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDeviceType must be used within a DeviceProvider");
  }
  return context;
}
