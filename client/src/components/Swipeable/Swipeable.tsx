import { useMemo, useRef } from "react";
import { SwipeableProps, TouchStateType } from "./Swipeable.types";
import { touchInitialState } from "./Swipeable.options";
import { touchEventHandlers } from "./Swipeable.helper";
import "./Swipeable.css";

function Swipeable({
  children,
  className,
  swipingLeftBgContent,
  swipingRightBgContent,
  onSwipeLeft,
  onSwipeRight,
}: SwipeableProps) {
  const touchRef = useRef<TouchStateType>(touchInitialState);
  const swipeableContainerRef = useRef<HTMLDivElement | null>(null);

  const swipingLeftAllowed = useMemo(() => {
    return !!(swipingLeftBgContent && onSwipeLeft);
  }, [swipingLeftBgContent, onSwipeLeft]);
  const swipingRightAllowed = useMemo(() => {
    return !!(swipingRightBgContent && onSwipeRight);
  }, [swipingRightBgContent, onSwipeRight]);

  return (
    <div
      className={`w-full overflow-x-hidden relative transition-all ${className}`}
      onTouchStart={touchEventHandlers.handleTouchStart(touchRef, swipingLeftAllowed, swipingRightAllowed)}
      onTouchMove={touchEventHandlers.handleTouchMove(
        touchRef,
        swipeableContainerRef,
        swipingLeftAllowed,
        swipingRightAllowed
      )}
      onTouchEnd={touchEventHandlers.handleTouchEnd(touchRef, swipeableContainerRef, onSwipeLeft, onSwipeRight)}
    >
      <div id="swipe-content-right" className="absolute top-0 left-0 w-full h-full opacity-0 overflow-hidden">
        {swipingRightBgContent}
      </div>
      <div id="swipe-content-left" className="absolute top-0 left-0 w-full h-full opacity-0 overflow-hidden">
        {swipingLeftBgContent}
      </div>
      <div ref={swipeableContainerRef} className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default Swipeable;
