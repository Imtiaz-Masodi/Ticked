import { DeviceType } from "../utils";

const mobileRegex = /Mobi|Android|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini|webOS|Windows Phone/i;

/**
 * Legacy function based on ChatGPT suggestion (simplified)
 */
export function detectDeviceType(): DeviceType {
  const ua = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || "";

  // 1. User Agent check for common handheld devices
  if (mobileRegex.test(ua)) {
    return DeviceType.HANDHELD;
  }

  // 2. Pointer type check (touch vs mouse)
  if (window.matchMedia("(pointer: coarse)").matches) {
    return DeviceType.HANDHELD;
  }

  // 3. Touch capability check
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    // fallback: if large screen + touch → treat as tablet/desktop with touch
    return (window as Window).innerWidth <= 1024 ? DeviceType.HANDHELD : DeviceType.DESKTOP_WITH_TOUCH;
  }

  // Default → assume desktop
  return DeviceType.DESKTOP;
}
